const ip = require("ip");

function getIP() {
  ip.address();
}
module.exports = {
  getIP,

};
