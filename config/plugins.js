const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");
const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const address = require("address");
const { faviconPath, publicPath, templatePath } = require("./paths");
const { inDevelopment, NODE_ENV } = require("./envs");

// =============================================================== //
// WEBPACK PLUGINS                                                 //
// =============================================================== //

const remoteAddress = address.ip();

/* common webpack plugins */
const plugins = [
  /* shows a compilation bar instead of the default compile message */
  new WebpackBar({
    color: "#268bd2",
    minimal: false,
    compiledIn: false,
  }),
  /* simplifies creation of HTML files to serve your webpack bundles */
  new HtmlWebpackPlugin({
    template: templatePath,
    favicon: faviconPath,
  }),
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [
        `Local development build: \x1b[1mhttp://localhost:3000\x1b[0m`,
        remoteAddress &&
          `Remote development build: \x1b[1mhttp://${remoteAddress}:3000\x1b[0m`,
      ].filter(Boolean),
      notes: [
        "Note that the development build is not optimized.",
        "To create a production build, use \x1b[1m\x1b[32myarn build\x1b[0m.\n",
      ],
    },
    clearConsole: false,
  }),
  /* webpack ENV files */
  new DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }),
  /* generates a manifest for all assets */
  new ManifestPlugin({
    fileName: "asset-manifest.json",
    publicPath,
    generate: (seed, files) => ({
      files: files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed),
    }),
  }),
];

/* development webpack plugins */
if (inDevelopment) {
  plugins.push(
    /* in browser error overlay */
    new ErrorOverlayPlugin(),
    /* hot-module plugin to update files without refreshing the page */
    new HotModuleReplacementPlugin(),
  );
} else {
  /* production webpack plugins */
  plugins.push(
    /* compiles SCSS to a single CSS file */
    new MiniCssExtractPlugin({
      filename: "bundle-min.css",
    }),
    /* copies some files from public to dist on build */
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/robots.txt" },
        { from: "public/manifest.json" },
        { from: "public/logo_192x192.png" },
        { from: "public/logo_256x256.png" },
        { from: "public/logo_512x512.png" },
      ],
    }),
  );
}

module.exports = plugins.filter(Boolean);
