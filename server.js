const express = require("express");
const address = require("address");
const chalk = require("chalk");

const app = express();
const LOCALIP = address.ip();
const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;
const REMOTEADDRESS = `http://${LOCALIP}:${PORT}`;

app.use(express.static("dist"));

const logMessage = message => {
  console.log(
    `${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.blue(
      "Application is running at:",
    )} ${chalk.rgb(235, 220, 52).bold(message)}`,
  );
};

app.listen(PORT, err => {
  if (!err) {
    logMessage(LOCALHOST);
    logMessage(REMOTEADDRESS);
  } else {
    console.err(`\nUnable to start server: ${err}`);
  }
});
