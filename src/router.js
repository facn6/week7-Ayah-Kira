const handlers = require("./handlers.js");

const router = (req, res) => {
  if (req.url === "/") {
    handlers.handlerHomeRoute(res);
  } else if (req.url.indexOf("public") !== -1) {
    handlers.handlePublic(req, res);
  } else if (req.url === "/posts") {
    console.log("Posts endpoint requested");
    handlers.selectionHandler(req, res);
    // } else if (req.url === "/public/node-icon.ico") {
    //   handlers.handleIcon(res);
  }
else if (req.url === '/my-handling-form-page') {
handlers.postHandler(req,res);

}
  else {
    handlers.errorHandler(res);
  }
};

module.exports = router;
