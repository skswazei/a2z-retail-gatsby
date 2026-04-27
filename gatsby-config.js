/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  jsxRuntime: "automatic",
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
        excludes: [`/404`, `/dev-404-page`],
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
