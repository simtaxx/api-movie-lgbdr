require('dotenv').config();

module.exports = {
  HOST: process.env.API_HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.DB_PORT,
  DB: process.env.DB
};
