const download = require("../src/download").download;
const crumb = require("./utils/crumbs");
const event = require("./utils/events");
const prompts = require("./prompts/prompt");
const host = require("./host");
const ip = require("ip");


function askDownload() {
  (async () => {
    // what to do
    let whatToDo = prompts.display("what to do");

    if (whatToDo === "exit") {
      process.exit(0);
    } else if (whatToDo === "download") {
      let downloadURL = await prompts({
        type: "text",
        message: "enter download url(Type exit to exit)",
        name: "value",
      });
      let fileName = await prompts({
        type: "text",
        message: "enter file name(Type exit to exit)",
        name: "value",
      });
      downloadURL = downloadURL.value;
      fileName = fileName.value;

      if (downloadURL === "exit" || fileName === "exit") {
        process.exit(0);
      } else if (downloadURL === "undefined" || fileName === "undefined") {
        process.exit(0);
      } else {
        download(downloadURL, fileName, function (downloadData) {
          let destination = downloadData.destination;
          let chkSum = downloadData;
          if (
            downloadData.error === null ||
            downloadData.error === "undefined"
          ) {
            console.error(downloadData.error);
          } else {
            host.start(function (hostStartData) {
              console.log(
                "Server ip: " + ip.address("private") + ":" + hostStartData.port
              );

              host.host(destination, chkSum, function (hostData) {
                console.log("File code: " + hostData.random);




              });
            });
          }
        }, false);
      }
    } else if (whatToDo === "capture") {
      let serverIp = await prompts({
        type: "text",
        message: "enter server ip(Type exit to exit)",
        name: "value",
      });
      serverIp = serverIp.value;

      let serverCode = await prompts({
        type: "text",
        message: "enter server code(Type exit to exit)",
        name: "value",
      });
      serverCode = serverCode.value;

      let filename = await prompts({
        type: "text",
        message: "enter filename(Type exit to exit)",
        name: "value",
      });
      filename = filename.value;

      if (serverIp !== "undefined" || serverCode !== "undefined") {
        download(
          serverIp + "/" + serverCode,
          filename,
          function (data) {
            if (data.error !== "undefined") {
              console.error(data.error);
            }
          },
          true
        );
      } else {
        process.exit(200);
      }
    } else {
      console.trace();
      process.exit(200);
    }
  })();
}

crumb.chkCrumb("NotFirstTimeCrumbCreated", function (bool) {
  if (bool === false) {
    crumb.create("NotFirstTimeCrumbCreated", function () {
      event.emit("NotFirstTimeCrumbCreated");
    });
  } else {
    askDownload();
  }
});
