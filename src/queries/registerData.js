const dbConnection = require("../database/db_connection.js");
const hashingPassword = require("../bcrypting/bcrypt.js").hashingPassword;

const registerData = (username, mail, password, cb) => {
  let hashedPassword = hashingPassword(password);

  hashedPassword.then(result => {
    console.log("AYAH", result);
    dbConnection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [username, mail, result],
      (err, res) => {
        if (err) return cb(err);
        cb(null, res);
      }
    );
  });

  console.log("AYAH", hashedPassword);
};

module.exports = { registerData };
