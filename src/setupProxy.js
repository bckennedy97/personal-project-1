const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/auth", { target: "http://localhost:4005" }));
  app.use(proxy("/api", { target: "http://localhost:4005" }));
};