const selfSigned = require("selfsigned");
const fs = require("fs");

const crtDir = require("../../locations").crtLocation;

function createCRT(name) {
  const attrs = [{ name: "commonName", value: name }];
  const pems = selfSigned.generate(attrs, {
    days: 365000,
    algorithm: "sha-256",
  });

  fs.writeFile(crtDir + "/" + "cert.crt", pems.cert, function () {
    console.log("created crt");
  });
  fs.writeFile(crtDir + "/" + "private.key", pems.private, function () {
    console.log("created private.key");
  });
  fs.writeFile(crtDir + "/" + "public.key", pems.public, function () {
    console.log("created public.key");
  });
}

function createCRTDir(callback) {
  fs.mkdir(crtDir, callback);
}

module.exports = {
  createCRT,
  createCRTDir,
};
