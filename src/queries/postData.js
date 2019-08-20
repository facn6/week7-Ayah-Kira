const dbConnection = require('../database/db_connection.js');

const postData = (name, password) => {
  dbConnection.query(
    'INSERT INTO users (name, password) VALUES ($1, $2)',
    [name, password],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;
