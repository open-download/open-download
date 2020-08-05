const { Stopwatch } = require("performance-stopwatch");
const events = require("events");

function stopwatchEmitter(name) {
  events.emit(name);
}

const sw = new Stopwatch({
  loggerFunc: stopwatchEmitter,
});

function start(name) {
  sw.start("started " + name);
}
function stop(name) {
  sw.total("end" + name);
}

module.exports = {
  start,
  stop,
};
