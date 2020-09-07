/* eslint-disable class-methods-use-this */

const Span = require("./Span");
const { sendTrace } = require("./helpers");

class Tracer {
  // queue = [];

  // sendSpanCallback = this.sendSpan.bind(this);

  // finishCallback = this.finishSpan.bind(this);

  // config = {};

  constructor(config) {
    this.config = config;
    this.queue = [];
    this.sendSpanCallback = this.sendSpan.bind(this);
    this.finishCallback = this.finishSpan.bind(this);

    setInterval(this.sendSpanCallback, config.interval);
  }

  startSpan(name) {
    return new Span(name, this.finishCallback);
  }

  finishSpan(spanContext) {
    this.queue.push(spanContext);
  }

  async sendSpan() {
    if (this.queue.length) {
      const tempQueue = this.queue;
      this.queue = [];
      try {
        await sendTrace(this.config, tempQueue);
      } catch (error) {
        console.log("error while sending trace to collector", error);
        // this.queue.push(...tempQueue);
      }
    }
  }
}
module.exports = Tracer;
