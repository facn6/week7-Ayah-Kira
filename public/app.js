function go() {
  console.log("Test");
  fetch("/posts")
    .then(function(response) {
      return response.json();
    })
    .then(function(parsed) {
      console.log(parsed);
      var results = parsed;
    });
}

go();
"use strict";

const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
  return new error('there is an error');
    } else {
      bcrypt.hash(password, salt, (err,hash)=>{
        if(err){
           return new error('there is an error');
         }
        else{
        return hash;
      }
      });
    }
  });
};


module.exports = {
  hashPassword
};
