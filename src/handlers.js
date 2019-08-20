const { readFile } = require("fs");
const path = require("path");
const url1 = require("url");
const getData = require("./queries/getData").getData;
var qs = require("qs");
// const postData = require("./queries/postData.js");

const serverError = (err, response) => {
  response.writeHead(500, "Content-Type:text/html");
  response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
  console.log(err);
};

const handlerHomeRoute = response => {
  const filepath = path.join(__dirname, "..", "public", "index.html");
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};
const handlePublic = (request, response) => {
  const { url } = request;
  const extention = url.split(".")[1];
  const extentionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon"
  };
  const filepath = path.join(__dirname, "..", url);
  readFile(filepath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-type": extentionType.html });
      response.end("<h1>Sorry, there was a server error</h1>");
    } else {
      response.writeHead(200, { "Content-type": extentionType[extention] });
      response.end(file);
    }
  });
};

const postEventHandler = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const {
      event,
      description,
      event_date,
      interested,
      category,
      location
    } = qs.parse(data);
    postData(
      event,
      description,
      event_date,
      interested,
      category,
      location,
      err => {
        if (err) {
          return serverError(err, response);
        } else {
          response.writeHead(302, { Location: "/" });
          response.end();
        }
      }
    );
  });
};

const errorHandler = response => {
  response.writeHead(404, { "content-type": "text/html" });
  response.end("<h1>404 Page Requested Cannot be Found</h1>");
};

const selectionHandler = (req, response) => {
  console.log("In the handler");
  console.log(getData);

  getData((err, res) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, we cannot show you anything...<h1>");
      console.log(err);
    } else {
      let output = JSON.stringify(res);
      console.log("Output", output);
      response.writeHead(200, { "content-type": "application/json" });
      response.end(output);
    }
  });
};

// const handleIcon = response => {
//   const filePath = path.join(__dirname, "..", url);
//   fs.readFile(filePath, (error, file) => {
//     if (error) {
//       console.log(error);
//       response.writeHead(500, { "Content-Type": "text/html" });
//       response.end("<h1>Sorry, we've had a problem on our end</h1>");
//     } else {
//       response.writeHead(200, { "Content-Type": "image/x-icon" });
//       response.end(file);
//     }
//   });
// };

module.exports = {
  handlerHomeRoute,
  handlePublic,
  errorHandler,
  selectionHandler,
  postEventHandler
  // handleIcon
};
