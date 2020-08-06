const path = require("path");
const crumbLocation = path.dirname(process.execPath) + "/crumb"
const crtLocation = path.dirname(process.execPath) + "/crt"
const downloadsFolder = require('downloads-folder')();

module.exports ={
    crumbLocation,
    crtLocation,
    downloadsFolder
}