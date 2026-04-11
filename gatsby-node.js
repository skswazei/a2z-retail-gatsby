/**
 * Implement Gatsby's Node APIs in this file.
 */

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
