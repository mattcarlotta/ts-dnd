const MiniCssExtractPlugin = require("mini-css-extract-plugin").loader;
const { inDevelopment, localIdentName } = require("./envs");
// =============================================================== //
// WEBPACK RULES                                                   //
// =============================================================== //

/* defines a typescript rule */
const tsRule = ({ enforce, loader, options }) => ({
  enforce: enforce || "post",
  test: /\.(ts|tsx)$/,
  loader,
  exclude: /(node_modules)/,
  options: options || {}
});

/* defines a SCSS rule */
const cssRule = ({ exclude, modules, sourceMap, test }) => ({
  test,
  exclude,
  use: [
    inDevelopment ? "style-loader" : MiniCssExtractPlugin,
    {
      loader: "css-loader",
      options: {
        sourceMap: sourceMap || !inDevelopment,
        modules: {
          mode: modules ? "local" : "global",
          localIdentName
        }
      }
    },
    "sass-loader"
  ].filter(Boolean)
});

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.scss$/;
const sassModuleRegex = /\.module\.scss$/;

module.exports = [
  /* lints JS files on compilation */
  tsRule({
    enforce: "pre",
    loader: "eslint-loader",
    options: {
      emitWarning: inDevelopment
    }
  }),
  /* handle React JS files */
  tsRule({
    loader: "ts-loader"
  }),
  /* handles CSS imports */
  cssRule({
    test: cssRegex,
    exclude: cssModuleRegex
  }),
  /* handles CSS module imports */
  cssRule({
    test: cssModuleRegex,
    modules: true
  }),
  /* handles SCSS imports */
  cssRule({
    test: sassRegex,
    exclude: sassModuleRegex
  }),
  /* handles SCSS module imports */
  cssRule({
    test: sassModuleRegex,
    modules: true
  })
];
