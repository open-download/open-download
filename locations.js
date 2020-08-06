let home = require("os").homedir();
let documents = home + '/Documents/';

const crumbLocation = documents + "/crumb"
const crtLocation = documents + "/crt"
const downloadsFolder = require('downloads-folder')();
console.log(crumbLocation)
module.exports ={
    crumbLocation,
    crtLocation,
    downloadsFolder
}