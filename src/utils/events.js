const Event = require("events");

class MyEmitter extends Event {}

const myEmitter = new MyEmitter();

function on(event, listener) {
  myEmitter.on(event, listener);
}
function emit(event, ...args) {
  myEmitter.emit(event, args);
}

module.exports = {
  on,
  emit,
};
