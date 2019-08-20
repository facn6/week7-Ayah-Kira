const handlers = require("./handlers.js");

const router = (req, res) => {
  if (req.url === "/") {
    handlers.handlerHomeRoute(res);
  } else if (req.url.indexOf("public") !== -1) {
    handlers.handlePublic(req, res);
  } else if (req.url === "/posts") {
    const section = req.url;
    handlers.handlerNews(res, section);
  } else if (req.url === "/public/node-icon.ico") {
    handlers.handleIcon(res);
  } else {
    handlers.handleNotFound(res);
  }
};

module.exports = router;
