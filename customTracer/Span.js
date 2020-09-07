/* eslint-disable class-methods-use-this */
const { uniqueId, getTimeStamp } = require("./helpers");

class Span {
  // name = "";

  // id = "";

  // traceId = "";

  // duration = "";

  // startTime = "";

  // callBackOnFinish;

  // tags = {};

  // logs = [];

  constructor(name, callBackOnFinish) {
    this.name = name;
    const uID = uniqueId();
    this.id = uID;
    this.traceId = uID;
    this.startTime = Date.now();
    this.logs = [];
    this.tags = [];
    this.callBackOnFinish = callBackOnFinish;
  }

  setTag(key, value) {
    this.tags.push({
      key,
      value
    });
  }

  log(logString) {
    this.logs.push({
      timestamp: getTimeStamp(),
      value: logString,
      endpoint: { serviceName: "Custom Tracer" }
    });
  }

  // get id() {
  //   return {
  //     traceId: this.traceId,
  //     spanId: this.id
  //   };
  // }

  finish() {
    this.duration = Date.now() - this.startTime;
    this.callBackOnFinish({
      name: this.name,
      duration: this.duration,
      timestamp: Number(`${this.startTime}000`),
      traceId: this.traceId,
      id: this.id,
      annotations: this.logs,
      binaryAnnotations: this.tags
    });
  }
}

module.exports = Span;
