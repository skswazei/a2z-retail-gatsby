const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const API_BASE_URL = process.env.GATSBY_API_BASE_URL;

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

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions;
  const template = path.resolve("./src/templates/product.tsx");

  const [software, hardware] = await Promise.all([
    fetchProducts("software", reporter),
    fetchProducts("hardware", reporter),
  ]);

  [...software, ...hardware].forEach((product) => {
    if (!product || !product.slug || !product.type) return;
    createPage({
      path: `/${product.type}/${product.slug}`,
      component: template,
      context: { product },
    });
  });

  reporter.info(`[a2z] Generated ${software.length} software + ${hardware.length} hardware pages`);
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
