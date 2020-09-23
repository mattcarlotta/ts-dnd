const { resolve } = require("path");
const { currentDirectory } = require("./envs");

// =============================================================== //
// WEBPACK PATHS                                                   //
// =============================================================== //

const resolvePath = path => resolve(currentDirectory, path);

module.exports = {
  /* project publicPath */
  publicPath: "/",
  /* compiled build output path (/dist) */
  outputPath: resolvePath("dist"),
  /* path to public folder (./public) */
  publicFolder: resolvePath("public"),
  /* entry point to the application index (./src/index.ts) */
  entryPath: resolvePath("src/index.ts"),
  /* path to index.html (build/index.html) */
  templatePath: resolvePath("public/index.html"),
  /* path to favicon.ico (build/favicon.ico) */
  faviconPath: resolvePath("public/favicon.ico"),
  /* paths to resolve */
  resolvePath
};
