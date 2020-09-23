const { outputPath, publicPath } = require("./paths");
const { inDevelopment } = require("./envs");

// =============================================================== //
// WEBPACK COMPILATION OUTPUT                                      //
// =============================================================== //

const filename = inDevelopment ? "[name].js" : `bundle.min.js`;

module.exports = {
  filename,
  path: outputPath,
  publicPath,
};
