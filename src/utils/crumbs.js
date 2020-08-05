const fs = require("fs");
const crumbDIR = require("../../locations").crumbLocation;
const event = require("../utils/events");

fs.readdir(crumbDIR, function (error) {
  if (error !== null) {
    fs.mkdir(crumbDIR, function () {
      event.emit("crumbDirCreated", null);
    });
  } else {
    event.emit("crumbDirAlreadyExists", null);
  }
});

/**
 * @function create
 * Asynchronously creates a crumb, replacing the crumb if it already exists.
 * @param crumb The name of the crumb.
 * @param {function()} callback
 */
function create(crumb, callback) {
  fs.writeFile(crumbDIR + "/" + crumb, "", callback);
}

/**
 * @function destroy
 * Asynchronously deletes a crumb.
 * @param crumb The name of the crumb.
 * @param {function()} callback
 */
function destroy(crumb, callback) {
  fs.unlink(crumbDIR + "/" + crumb, callback);
}

/**
 * @function chkCrumb
 * Asynchronously check a crumb, returns true if it exists else it returns false to the callback function
 * @param crumb The name of the crumb.
 * @param {function(boolean)} callback
 */
function chkCrumb(crumb, callback) {
  fs.stat(crumbDIR + "/" + crumb, function (err) {
    callback(err === null);
  });
}
module.exports = {
  create,
  destroy,
  chkCrumb,
};
