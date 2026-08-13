/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  jsxRuntime: "automatic",
  // No-op adapter. Setting `adapter` here makes Gatsby SKIP its zero-config
  // auto-install of gatsby-adapter-netlify (see gatsby/dist/utils/adapter/manager.js:
  // `if (adapterFromGatsbyConfig) use it; else auto-detect`). The Netlify adapter
  // strips client-only `matchPath` pages, which 404s the SSR=true blog catch-all.
  // With this no-op (name only; cache/adapt/config are optional), the build emits
  // raw `public/` — so our manual `_redirects` SPA fallback works on Netlify Git
  // builds exactly like a manual zip deploy. Remove this only if SSR=false.
  adapter: { name: "a2z-noop-adapter", adapt() {} },
  siteMetadata: {
    title: `A2Z Retail Solutions`,
    description: `One platform for POS, inventory, suppliers, payments, and reporting. Built for liquor stores and neighborhood markets.`,
    author: `@a2zpos`,
    siteUrl: `https://a2zpos.io`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // `/sitemap` is the human-readable HTML sitemap page, and `/blog/page/N`
        // is pagination — neither belongs in the XML sitemap.
        excludes: [`/404`, `/dev-404-page`, `/sitemap`, `/blog/page/*`],
        // pageContext is pulled in so blog posts can carry their real WordPress
        // edit date as lastmod instead of every URL sharing the build timestamp.
        query: `{
          site { siteMetadata { siteUrl } }
          allSitePage { nodes { path pageContext } }
        }`,
        resolvePages: ({ allSitePage }) => allSitePage.nodes,
        serialize: (page) => {
          const path = page.path;
          // Priority tiers mirror the reference sitemap:
          //   home 1.0 > blog posts 0.9 > product/service/commercial 0.8 > about/legal 0.7
          let priority = 0.7;
          if (path === `/`) {
            priority = 1.0;
          } else if (/^\/blog\/.+/.test(path)) {
            priority = 0.9;
          } else if (
            /^\/(software|hardware|service)\//.test(path) ||
            path === `/packages/` ||
            path === `/blog/`
          ) {
            priority = 0.8;
          }
          // Blog posts carry the WordPress post object in pageContext (see
          // gatsby-node.js `context: { post: full }`), so they get their real
          // edit date. Static pages have no such date and are left without a
          // lastmod rather than being stamped with a misleading build time.
          const post = (page.pageContext || {}).post;
          const modified = post && (post.modified || post.date);
          const stamp = modified ? new Date(modified) : null;
          const hasStamp = stamp && !Number.isNaN(stamp.valueOf());
          return {
            url: path,
            changefreq: `daily`,
            priority,
            ...(hasStamp ? { lastmod: stamp.toISOString() } : {}),
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://a2zpos.io`,
        sitemap: `https://a2zpos.io/sitemap.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `A2Z Retail Solutions`,
        short_name: `A2Z POS`,
        start_url: `/`,
        background_color: `#4B36BF`,
        theme_color: `#4B36BF`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: { "@": "src" },
        extensions: ["ts", "tsx", "js", "jsx"],
      },
    },
  ],
}
