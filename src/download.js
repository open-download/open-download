const http = require("http");
let https = require("https");
const fs = require("fs");
const downloadFolder = require("../locations").downloadsFolder;
const mime = require("mime-to-extensions");
const ProgressBar = require("progress");
const crypto = require("crypto");

const download = function (url, fileName, cb, chkSum) {
  let options


  url = new URL(url);
  let dest = downloadFolder;

  if (chkSum) {
    options = {
      host: url.hostname,
      path: url.pathname,
      port: url.port,
      rejectUnauthorized: false,
    }
  }
  else{
    options = {
      host: url.hostname,
      path: url.pathname,
      port: url.port,
      rejectUnauthorized: true,
    }
  }



  if (typeof url.protocol === "undefined" || url.protocol === null) {
    console.error("an error occurred unable to get protocol of url");
    process.exit(200);
  } else {
    let protocol;
    let request;

    if (url.protocol === "http:") {
      protocol = http;
    } else if (url.protocol === "https:") {
      protocol = https;
    } else {
      console.error("protocol not supported " + url.protocol);
      process.exit(200);
    }

    request = protocol.get(
      options,
      function (response) {
        const fileSize = parseInt(response.headers["content-length"]);
        const mimeType = mime.extension(response.headers["content-type"]);

        dest = dest + "/" + fileName + "." + mimeType;
        const fileW = fs.createWriteStream(dest);

        fileW.on("error", (err) => {
          fileW.close();

          if (err.code === "EEXIST") {
            cb({ error: "File already exists" });
          } else {
            fs.unlink(dest, () => {}); // Delete temp file
            cb({ error: err.message });
          }
        });

        if (response.statusCode === 200) {
          const bar = new ProgressBar(
            "downloading :total/:current [:bar] :rate/bps :percent :etas :elapsed",
            { total: fileSize, renderThrottle: 5, width: fileSize, incomplete: " ", complete: "█" }
          );

          response.on("data", function (chunk) {
            bar.tick(chunk.length);
            fileW.write(chunk);
          });
          response.on("end", function () {
            console.log("downloaded");
            fs.readFile(dest, function (err, data) {
              (async ()=>{
                const checksum = await crypto
                    .createHash("SHA1")
                    .update(data)
                    .digest("hex");

                if (chkSum === true) {
                  let getCheckSumOptions ={
                    host: url.hostname,
                    port: url.port,
                    path: url.pathname + "chksum",
                    rejectUnauthorized: false
                  }
                  protocol.get(getCheckSumOptions, function (chkResponse) {
                    let checksumData = "undefined";

                    chkResponse.on("data", function (chunk) {
                      if (checksumData === "undefined") {
                        checksumData = chunk.toString();
                      } else {
                        checksumData = checksumData + chunk.toString();
                      }
                    });

                    chkResponse.on("end", function () {
                      if (checksumData === `"${checksum}"`) {
                        console.log("check sum passed");
                      } else {
                        console.log("checksum failed");
                      }
                    });

                  });

                } else {
                  cb({ destination: dest, chkSum: checksum });
                }
              })();
            });
          });
        } else {
          cb({ error: response.statusCode });
          fs.unlink(fileW.path, function (error) {
            if (error !== null){
              console.error(error);
            }
          })
        }
      }
    );

    request.on("error", (err) => {
      fs.unlink(dest, () => {}); // Delete temp file
      cb({ error: err.message });
    });
  }
};

module.exports = {
  download,
};
