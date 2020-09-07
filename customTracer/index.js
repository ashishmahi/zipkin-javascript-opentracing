const express = require("express");
const Tracer = require("./Tracer");

const app = express();
const tracer = new Tracer({
  url: "http://localhost:9411/api/v1/spans",
  interval: 100,
  serviceName: "Custom Tracer"
});

app.use(function logger(req, res, next) {
  const span = tracer.startSpan("Custom Tracer Span");

  setTimeout(() => {
    span.log("Logging in Custom Tracer");
    span.setTag("Foo", "Bar");
  }, 100);

  setTimeout(() => {
    span.finish();
  }, 200);

  next();
});

app.get("/", (req, res) => res.send(Date.now().toString()));

app.listen(8080, () => {
  console.log("Frontend listening on port 8080!");
});
