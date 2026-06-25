const path = require("path");
const fs = require("fs");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const API_BASE_URL = process.env.GATSBY_API_BASE_URL;

// SSR=true → blog list + detail render client-side (new/edited posts appear
// without a rebuild, no per-post SEO). SSR=false (default) → fully static blog.
const SSR = process.env.SSR === "true";

const fetchProducts = async (type, reporter) => {
  if (!API_BASE_URL) {
    reporter.warn(`GATSBY_API_BASE_URL is not set — skipping ${type} page generation`);
    return [];
  }
  const url = `${API_BASE_URL}/wp-json/a2z/v1/${type}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      reporter.warn(`[${type}] ${url} returned ${res.status} — skipping`);
      return [];
    }
    return await res.json();
  } catch (err) {
    reporter.warn(`[${type}] fetch failed (${err.message}) — skipping`);
    return [];
  }
};

const writeBuildData = async (endpoint, filename, reporter) => {
  const target = path.join(__dirname, "src/data", filename);
  try {
    const res = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/${endpoint}`);
    if (!res.ok) {
      reporter.warn(`[a2z] ${endpoint} returned ${res.status} — leaving ${filename} unchanged`);
      return;
    }
    const data = await res.json();
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, JSON.stringify(data, null, 2));
    reporter.info(`[a2z] wrote ${filename}`);
  } catch (err) {
    reporter.warn(`[a2z] ${endpoint} fetch failed: ${err.message}`);
  }
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

const fetchJson = async (endpoint, reporter) => {
  if (!API_BASE_URL) {
    reporter.warn(`GATSBY_API_BASE_URL is not set — skipping ${endpoint}`);
    return null;
  }
  const url = `${API_BASE_URL}/wp-json/a2z/v1/${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      reporter.warn(`[${endpoint}] ${url} returned ${res.status} — skipping`);
      return null;
    }
    return await res.json();
  } catch (err) {
    reporter.warn(`[${endpoint}] fetch failed (${err.message}) — skipping`);
    return null;
  }
};

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions;
  const productTemplate = path.resolve("./src/templates/product.tsx");

  // Products are always static (full SEO) in both modes.
  const [software, hardware] = await Promise.all([
    fetchProducts("software", reporter),
    fetchProducts("hardware", reporter),
  ]);

  [...software, ...hardware].forEach((product) => {
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
      `[a2z] Generated ${software.length} software + ${hardware.length} hardware + client-side blog (SSR=true)`
    );
    return;
  }

  // Static blog (default): build every post + paginated list page.
  const blogPostTemplate = path.resolve("./src/templates/blog-post.tsx");
  const blogListTemplate = path.resolve("./src/templates/blog-list.tsx");

  const [posts, blogSettings] = await Promise.all([
    fetchJson("posts", reporter),
    fetchJson("blog-settings", reporter),
  ]);

  let blogPostCount = 0;
  if (Array.isArray(posts)) {
    for (const summary of posts) {
      if (!summary || !summary.slug) continue;
      const full = await fetchJson(`posts/${summary.slug}`, reporter);
      if (!full) continue;
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
    `[a2z] Generated ${software.length} software + ${hardware.length} hardware + ${blogPostCount} blog post + ${blogListCount} blog list pages`
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
