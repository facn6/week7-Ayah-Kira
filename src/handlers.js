const { readFile } = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const url1 = require("url");
const { parse } = require("cookie");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

const url = require("url");
const registerData = require("./queries/registerData.js").registerData;

const getData = require("./queries/getData").getData;
const getDataUsers = require("./queries/getData").getDataUsers;

var qs = require("qs");
const postData = require("./queries/postData.js").postData;

var qs1 = require("querystring");

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
    const { psw, uname } = qs1.parse(data);
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
        var nameCheck = res.filter(function(element) {
          return element.name === uname;
        });
        console.log(nameCheck);
        if (nameCheck.length === 0) {
          console.log("No user");
          response.writeHead(401, "Content-Type:text/html");
          response.end("<h1>No such user...<h1>");
        } else {
          console.log("Check pass", nameCheck[0].password);
          console.log("Ps inserted by the user", psw);
          bcrypt.compare(psw, nameCheck[0].password, function(err, res) {
            console.log("Inside compare", psw, nameCheck[0].password);
            if (err) {
              console.log(err);
            } else {
              console.log(res);
              if (!res) {
                console.log("No PASS");
                response.writeHead(401, "Content-Type:text/html");
                response.end("<h1>Inncorrect password, access denied</h1>");
              } else {
                var token = sign(
                  {
                    name: `${uname}`,
                    logged_in: true
                  },
                  "ourSecret"
                );
                console.log(token);
                response.writeHead(302, {
                  "Set-Cookie": `data=${token}; HttpOnly`,
                  Location: "/"
                });
                console.log("Token", token);
                return response.end();
              }
            }
          });
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

const postHandler = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });

  request.on("end", () => {
    const { name, category, content } = qs.parse(data);
    postData(name, category, content, err => {
      if (err) {
        return serverError(err, response);
      } else {
        response.writeHead(302, { Location: "/" });
        response.end();
      }
    });
  });
};

const register = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });

  request.on("end", () => {
    const { username, mail, password } = qs.parse(data);
    console.log("ff", data);
    registerData(username, mail, password, err => {
      if (err) {
        return serverError(err, response);
      } else {
        response.writeHead(302, { Location: "/" });
        response.end();
      }
    });
  });
};

const cookies = (req, res) => {
  if (!req.headers.cookie) {
    res.writeHead(401, {
      "Content-Type": "text/html"
    });
    return res.end("false");
  } else {
    const { data } = parse(req.headers.cookie);
    console.log("Headers", req.headers.cookie);
    console.log(data);
    return verify(data, "ourSecret", (err, response) => {
      if (err) {
        console.log(err);
        res.writeHead(401, {
          "Content-Type": "text/html"
        });
        return res.end("false");
      } else {
        console.log("Cookie response", response);
        var cookieInfo = JSON.stringify(response);
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        return res.end(cookieInfo);
      }
    });
  }
};

const logout = (req, res) => {
  res.writeHead(302, {
    "Set-Cookie": "data=0; Max-Age=0",
    Location: "/"
  });
  return res.end();
};

module.exports = {
  handlerHomeRoute,
  handlePublic,
  errorHandler,
  selectionHandler,
  login,
  postHandler,
  register,
  cookies,
  logout
};
