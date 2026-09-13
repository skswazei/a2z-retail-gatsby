const path = require("path");
const fs = require("fs");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const API_BASE_URL = process.env.GATSBY_API_BASE_URL;

// SSR=true → blog list + detail render client-side (new/edited posts appear
// without a rebuild, no per-post SEO). SSR=false (default) → fully static blog.
const SSR = process.env.SSR === "true";

// The WordPress API is slow (1–5s per request) and occasionally drops one.
// Before this retry existed, a single dropped request silently removed that
// page from the build, so a published URL went 404 on the live site.
// Transient failures (network error, timeout, 429, 5xx) are retried with
// backoff; anything else (e.g. 404) is returned straight away.
//
// The host rate-limits bursts with 429 (a Netlify build hit it ~12s in), and
// a 1-2s wait is too short for the limit to reset — so 429 honours
// Retry-After when sent and otherwise backs off 5s/10s/20s/40s.
const FETCH_ATTEMPTS = 5;
const FETCH_TIMEOUT_MS = 30000;
const RATE_LIMIT_BASE_MS = 5000;
const MAX_RETRY_AFTER_MS = 60000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryDelayMs = (res, attempt) => {
  if (res && res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after"));
    if (retryAfter > 0) return Math.min(retryAfter * 1000, MAX_RETRY_AFTER_MS);
    return RATE_LIMIT_BASE_MS * 2 ** (attempt - 1);
  }
  return 1000 * 2 ** (attempt - 1);
};

const fetchWithRetry = async (url, reporter) => {
  let result = { ok: false, status: 0, data: null, error: "not attempted" };
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt++) {
    let res = null;
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
      if (res.ok) {
        return { ok: true, status: res.status, data: await res.json(), error: null };
      }
      result = { ok: false, status: res.status, data: null, error: `returned ${res.status}` };
      if (res.status !== 429 && res.status < 500) return result;
    } catch (err) {
      result = { ok: false, status: 0, data: null, error: `fetch failed (${err.message})` };
    }
    if (attempt < FETCH_ATTEMPTS) {
      const delay = retryDelayMs(res, attempt);
      reporter.warn(
        `[a2z] ${url} ${result.error} — retrying in ${delay / 1000}s (${attempt}/${FETCH_ATTEMPTS - 1})`
      );
      await sleep(delay);
    }
  }
  return result;
};

const fetchProducts = async (type, reporter) => {
  if (!API_BASE_URL) {
    reporter.warn(`GATSBY_API_BASE_URL is not set — skipping ${type} page generation`);
    return [];
  }
  const url = `${API_BASE_URL}/wp-json/a2z/v1/${type}`;
  const res = await fetchWithRetry(url, reporter);
  if (!res.ok) {
    // Fails `gatsby build` (only warns in develop) rather than deploying a
    // site with every ${type} page missing.
    reporter.panicOnBuild(`[${type}] ${url} ${res.error} after ${FETCH_ATTEMPTS} attempts`);
    return [];
  }
  return res.data;
};

const writeBuildData = async (endpoint, filename, reporter) => {
  const target = path.join(__dirname, "src/data", filename);
  const res = await fetchWithRetry(`${API_BASE_URL}/wp-json/a2z/v1/${endpoint}`, reporter);
  if (!res.ok) {
    reporter.warn(`[a2z] ${endpoint} ${res.error} — leaving ${filename} unchanged`);
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(res.data, null, 2));
  reporter.info(`[a2z] wrote ${filename}`);
};

exports.onPreBootstrap = async ({ reporter }) => {
  if (!API_BASE_URL) {
    reporter.warn("[a2z] GATSBY_API_BASE_URL not set — build-time data will be empty");
    return;
  }
  await Promise.all([
    writeBuildData("menus", "menus.json", reporter),
    writeBuildData("theme-options", "theme-options.json", reporter),
    writeBuildData("page-seo", "page-seo.json", reporter),
    writeBuildData("pages-seo", "pages-seo.json", reporter),
  ]);
};

// `required` fails `gatsby build` when the request still fails after retries;
// otherwise the failure is only warned about and null is returned.
const fetchJson = async (endpoint, reporter, { required = false } = {}) => {
  if (!API_BASE_URL) {
    reporter.warn(`GATSBY_API_BASE_URL is not set — skipping ${endpoint}`);
    return null;
  }
  const url = `${API_BASE_URL}/wp-json/a2z/v1/${endpoint}`;
  const res = await fetchWithRetry(url, reporter);
  if (!res.ok) {
    const message = `[${endpoint}] ${url} ${res.error}`;
    if (required) {
      reporter.panicOnBuild(`${message} after ${FETCH_ATTEMPTS} attempts`);
    } else {
      reporter.warn(`${message} — skipping`);
    }
    return null;
  }
  return res.data;
};

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions;
  const productTemplate = path.resolve("./src/templates/product.tsx");

  // Products are always static (full SEO) in both modes.
  const [software, hardware, service] = await Promise.all([
    fetchProducts("software", reporter),
    fetchProducts("hardware", reporter),
    fetchProducts("service", reporter),
  ]);

  [...software, ...hardware, ...service].forEach((product) => {
    if (!product || !product.slug || !product.type) return;
    createPage({
      path: `/${product.type}/${product.slug}`,
      component: productTemplate,
      context: { product },
    });
  });

  if (SSR) {
    // Client-side blog: one list shell + a catch-all detail shell.
    createPage({
      path: `/blog`,
      component: path.resolve("./src/templates/blog-list-dynamic.tsx"),
    });
    createPage({
      path: `/blog-app/`,
      matchPath: `/blog/*`,
      component: path.resolve("./src/templates/blog-post-dynamic.tsx"),
    });
    reporter.info(
      `[a2z] Generated ${software.length} software + ${hardware.length} hardware + ${service.length} service + client-side blog (SSR=true)`
    );
    return;
  }

  // Static blog (default): build every post + paginated list page.
  const blogPostTemplate = path.resolve("./src/templates/blog-post.tsx");
  const blogListTemplate = path.resolve("./src/templates/blog-list.tsx");

  const [posts, blogSettings] = await Promise.all([
    fetchJson("posts", reporter, { required: true }),
    fetchJson("blog-settings", reporter),
  ]);

  // The list endpoint has no content/seo/modified, so each post needs its own
  // detail request. Space them out so the host's burst limit isn't tripped.
  const POST_REQUEST_GAP_MS = 500;
  let blogPostCount = 0;
  if (Array.isArray(posts)) {
    for (const [index, summary] of posts.entries()) {
      if (!summary || !summary.slug) continue;
      if (index > 0) await sleep(POST_REQUEST_GAP_MS);
      const url = `${API_BASE_URL}/wp-json/a2z/v1/posts/${summary.slug}`;
      const res = await fetchWithRetry(url, reporter);
      if (!res.ok) {
        if (res.status === 404) {
          // Unpublished between the list and detail requests — genuinely gone.
          reporter.warn(`[posts/${summary.slug}] ${res.error} — skipping`);
        } else {
          reporter.panicOnBuild(
            `[posts/${summary.slug}] ${url} ${res.error} after ${FETCH_ATTEMPTS} attempts — ` +
              `failing the build rather than dropping a published post`
          );
        }
        continue;
      }
      const full = res.data;
      createPage({
        path: `/blog/${full.slug}`,
        component: blogPostTemplate,
        context: { post: full },
      });
      blogPostCount++;
    }
  }

  let blogListCount = 0;
  if (Array.isArray(posts) && posts.length > 0) {
    const perPage = blogSettings?.posts_per_page > 0 ? blogSettings.posts_per_page : 9;
    const totalPages = Math.max(1, Math.ceil(posts.length / perPage));

    for (let page = 1; page <= totalPages; page++) {
      const slice = posts.slice((page - 1) * perPage, page * perPage);
      createPage({
        path: page === 1 ? `/blog` : `/blog/page/${page}`,
        component: blogListTemplate,
        context: {
          posts: slice,
          currentPage: page,
          totalPages,
          perPage,
        },
      });
      blogListCount++;
    }
  }

  reporter.info(
    `[a2z] Generated ${software.length} software + ${hardware.length} hardware + ${service.length} service + ${blogPostCount} blog post + ${blogListCount} blog list pages`
  );
};

// When SSR=true, add the SPA fallback so direct hits / crawlers on an unbuilt
// /blog/<slug>/ boot the catch-all shell. Real files (the /blog/ list, assets)
// always win, so only unbuilt slugs fall through. No-op when SSR=false.
exports.onPostBuild = async ({ reporter }) => {
  if (!SSR) return;

  const publicDir = path.join(__dirname, "public");

  // Netlify: non-forced 200 rewrite.
  const redirectsPath = path.join(publicDir, "_redirects");
  const redirectRule = "/blog/*  /blog-app/index.html  200";
  try {
    let existing = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, "utf8") : "";
    if (!existing.includes("/blog-app/index.html")) {
      existing = existing.replace(/\s*$/, "") + "\n" + redirectRule + "\n";
      fs.writeFileSync(redirectsPath, existing);
      reporter.info("[a2z] SSR=true → appended /blog/* SPA rule to public/_redirects");
    }
  } catch (err) {
    reporter.warn(`[a2z] could not update _redirects: ${err.message}`);
  }

  // Apache / Hostinger: rewrite unbuilt blog paths to the shell, keeping real files.
  const htaccessPath = path.join(publicDir, ".htaccess");
  const htaccessBlock = [
    "",
    "# A2Z SSR=true — client-side blog SPA fallback",
    "<IfModule mod_rewrite.c>",
    "  RewriteEngine On",
    "  RewriteBase /",
    "  RewriteCond %{REQUEST_FILENAME} !-f",
    "  RewriteCond %{REQUEST_FILENAME} !-d",
    "  RewriteRule ^blog/.+ /blog-app/index.html [L]",
    "</IfModule>",
    "",
  ].join("\n");
  try {
    let existing = fs.existsSync(htaccessPath) ? fs.readFileSync(htaccessPath, "utf8") : "";
    if (!existing.includes("client-side blog SPA fallback")) {
      fs.writeFileSync(htaccessPath, existing.replace(/\s*$/, "") + "\n" + htaccessBlock);
      reporter.info("[a2z] SSR=true → appended blog SPA fallback to public/.htaccess");
    }
  } catch (err) {
    reporter.warn(`[a2z] could not update .htaccess: ${err.message}`);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /swiper/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
