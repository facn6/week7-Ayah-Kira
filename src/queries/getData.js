const databaseConnection = require("../database/db_connection.js");
// var SQL = require("sql-template-strings");

const getData = cb => {
  databaseConnection.query("SELECT * FROM posts", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

//Send a query

// const getSelectData = (datFrom, datTo, cat, loc, cb) => {
//   databaseConnection.query(
//     SQL`SELECT *
//                  FROM event
//                  WHERE (category = ${cat})
//                  OR (location =  ${loc})`,
//
//     (err, res) => {
//       if (err) {
//         cb(err);
//       } else {
//         cb(null, res.rows);
//       }
//     }
//   );
// };

module.exports = {
  getData
  // ,getSelectData
};
