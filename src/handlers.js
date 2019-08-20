const { readFile } = require("fs");
const path = require("path");
const url1 = require("url");
const getSelectData = require("./queries/getData").getSelectData;
var qs = require("qs");
const postData = require("./queries/postData.js");

const serverError = (err, response) => {
  response.writeHead(500, "Content-Type:text/html");
  response.end("<h1>Sorry, there was a problem loading the homepage</h1>");
  console.log(err);
};

const homeHandler = response => {
  const filepath = path.join(__dirname, "..", "public", "index.html");
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};
const publicHandler = (url, response) => {
  const filepath = path.join(__dirname, "..", url);
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    const [, extension] = url.split(".");
    const extensionType = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      ico: "image/x-icon"
    };
    response.writeHead(200, { "content-type": extensionType[extension] });
    response.end(file);
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
  const path = url1.parse(req.url).path;
  console.log(path);
  const datFrom = path.split("?")[1].split("=")[1];
  const datTo = path.split("?")[2].split("=")[1];
  const cat = path.split("?")[3].split("=")[1];
  const loc = path.split("?")[4].split("=")[1];
  console.log(cat);
  console.log(loc);

  getSelectData(datFrom, datTo, cat, loc, (err, res) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, there was a problem getting the results<h1>");
      console.log(err);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, { "content-type": "application/json" });
      response.end(output);
    }
  });
};

const handleIcon = response => {
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      response.end(file);
    }
  });
};

module.exports = {
  homeHandler,
  publicHandler,
  errorHandler,
  selectionHandler,
  postEventHandler,
  handleIcon
};
