require('dotenv').config();

module.exports = {
  HOST: process.env.DB_host,
  USER: process.env.DB_user,
  PASSWORD: process.env.DB_password,
  DB: process.env.DB_name,
  dialect: 'mysql'
};
