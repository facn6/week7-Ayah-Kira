const { readFile } = require("fs");
const path = require("path");
const url1 = require("url");
const { parse } = require("cookie");
const { sign } = require("jsonwebtoken");

const getData = require("./queries/getData").getData;
const getDataUsers = require("./queries/getData").getDataUsers;

var qs = require("querystring");
// const postData = require("./queries/postData.js")postData;

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

const login = (req, response) => {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    const { psw, uname } = qs.parse(data);
    console.log("Data from the FE", data);
    console.log("Parsed data from the FE", psw, uname);
    getDataUsers((err, res) => {
      if (err) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, we cannot show you anything...<h1>");
        console.log(err);
      } else {
        let output = JSON.stringify(res);
        console.log("OutputOfUsers", output);
        console.log(uname);
        console.log(res);
        // var names = [];
        var nameCheck = res.filter(function(element) {
          return element.name === uname;
        });
        console.log(nameCheck);
        if (nameCheck.length === 0) {
          console.log("No user");
          response.writeHead(500, "Content-Type:text/html");
          response.end("<h1>No such user...<h1>");
        } else {
          console.log("Check pass", nameCheck[0].password);
          if (nameCheck[0].password !== psw) {
            console.log("No password");
            response.writeHead(500, "Content-Type:text/html");
            response.end("<h1>Inncorrect password, access denied</h1>");
          }
          //If the password matches to what we have in our DB:
          //Create a token:
          else {
            var token = sign(
              {
                name: uname,
                logged_in: true
              },
              "ourSecret"
            );
            //
            console.log(token);
            response.writeHead(302, {
              "Set-Cookie": `data=${token}; HttpOnly`,
              Location: "/"
            });
            console.log("Token", token);
            return response.end();
          }
        }
      }
    });
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

module.exports = {
  handlerHomeRoute,
  handlePublic,
  errorHandler,
  selectionHandler,
  login
};
