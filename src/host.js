const express = require("express");
const app = express();
const port = 3000;
const random = (Math.random() * 100000).toFixed(0);
const https = require("https");
const crtLocation = require("../locations.js").crtLocation;
const fs = require("fs");

function host(fileLocation, chkSum, cb) {
  app.get("/" + random, function (req, res) {
    res.sendFile(fileLocation);
  });
  app.get("/" + random + "chksum", function (req, res) {
    res.json(chkSum);
  });
  cb({ random: random });
}

function start(cb) {
  https
    .createServer(
      {
        key: fs.readFileSync(crtLocation + "/private.key"),
        cert: fs.readFileSync(crtLocation + "/cert.crt"),
      },
      app
    )
    .listen(port, cb({ port: port }));
}
function stop() {
  app.stop();
}

module.exports = {
  host,
  start,
  stop,
};
