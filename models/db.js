const mariadb = require('mariadb');
const dbConfig = require('../config/db.js');

const connection = mariadb.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  database: dbConfig.DB
});

connection.getConnection()
  .then(() => {
    console.log('je suis co');
  })
  .catch((err) => {
    throw err;
  });

module.exports = connection;
