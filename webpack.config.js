const devServer = require("./config/devServer");
const plugins = require("./config/plugins");
const optimization = require("./config/optimization");
const output = require("./config/output");
const rules = require("./config/rules");
const { alias, entryPath } = require("./config/paths");
const { inDevelopment } = require("./config/envs");

// =============================================================== //
// WEBPACK CONFIGURATION                                           //
// =============================================================== //

const devtool = inDevelopment ? "inline-source-map" : false;
const mode = inDevelopment ? "development" : "production";

module.exports = {
  devtool,
  devServer,
  entry: [entryPath],
  mode,
  module: { rules },
  optimization,
  output,
  performance: {
    hints: false
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
    alias
  },
  plugins
};
