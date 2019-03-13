const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/auth", { target: "http://localhost:4005" }));
  app.use(proxy("/api", { target: "http://localhost:4005" }));
  app.use(proxy("/user", { target: "http://localhost:4005" }));
  app.use(proxy("/admin", { target: "http://localhost:4005" }));
  app.use(proxy("/favorites", { target: "http://localhost:4005" }));
};