// =============================================================== //
// ENVS                                                            //
// =============================================================== //

const { NODE_ENV, PORT } = process.env;

const inDevelopment = NODE_ENV === "development";
const inProduction = NODE_ENV === "production";

module.exports = {
  currentDirectory: process.cwd(),
  inDevelopment,
  inProduction,
  NODE_ENV,
  localIdentName: "[local]___[hash:base64:5]",
  PORT,
};
