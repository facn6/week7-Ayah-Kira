const handlers = require("./handlers.js");

const router = (req, res) => {
  if (req.url === "/") {
    handlers.handlerHomeRoute(res);
  } else if (req.url.indexOf("public") !== -1) {
    handlers.handlePublic(req, res);
  } else if (req.url === "/posts") {
    console.log("Posts endpoint requested");
    handlers.selectionHandler(req, res);
  } else if (req.url === "/login") {
    handlers.login(req, res);
  } else if (req.url === "/logout") {
    handlers.logout(req, res);
  } else if (req.url === "/cookies") {
    handlers.cookies(req, res);
  } else if (req.url === "/my-handling-form-page") {
    handlers.postHandler(req, res);
  } else if (req.url === "/register") {
    handlers.register(req, res);
  } else {
    handlers.errorHandler(res);
  }
};

module.exports = router;
