const dbConnection = require('../database/db_connection.js');

const postData = (name, category, post_content, cb) => {
  dbConnection.query(
    'INSERT INTO posts (username, category, post_content) VALUES ($1, $2, $3)',
    [name, category, post_content],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports ={ postData};
