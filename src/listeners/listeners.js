const event = require("../utils/events");
const chalk = require("chalk");
const certificate = require("../utils/certificate");

event.on("crumbDirCreated", function () {
  console.log(chalk.green("Crumb directory created"));
  certificate.createCRTDir(function () {
    certificate.createCRT((Math.random() * 100000).toFixed(0));
  });
});

event.on("downloaded", function () {
  console.log(chalk.green("Downloaded file"));
});
