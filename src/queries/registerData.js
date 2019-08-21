const dbConnection = require('../database/db_connection.js');
const bcrypt = require("bcryptjs");

const registerData = (username, mail, password, cb) => {
let hashedPassword='';
  bcrypt.genSalt(10, (err, salt) => {
     if (err) {
   return new error('there is an error');
    } else {
      bcrypt.hash(password, salt, (err,hash)=>{
         if(err){
           return new error('there is an error');
          }
      else{

        hashedPassword=hash;
        dbConnection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [username, mail, hashedPassword],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
      console.log('ff',hashedPassword);
    }
  );

     }
   })
 }
})


};

module.exports ={ registerData};
