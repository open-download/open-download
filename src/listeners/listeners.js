const event = require("../utils/events.js");
const chalk = require("chalk");
const certificate = require("../utils/certificate.js");

event.on("crumbDirCreated", function () {
  console.log(chalk.green("Crumb directory created"));
  certificate.createCRTDir(function () {
    certificate.createCRT((Math.random() * 100000).toFixed(0));
  });
});

event.on("downloaded", function () {
  console.log(chalk.green("Downloaded file"));
});
