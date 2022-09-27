require('dotenv').config();

let config = {
  HOST: process.env.DB_host,
  USER: process.env.DB_user,
  PASSWORD: process.env.DB_password,
  DB: process.env.DB_name,
  dialect: 'mysql'
};

if (process.env.NODE_ENV === 'test') {
  config = {
    HOST: process.env.TEST_DB_host,
    USER: process.env.TEST_DB_user,
    PASSWORD: process.env.TEST_DB_password,
    DB: process.env.TEST_DB_name,
    dialect: 'mysql'
  };
}

module.exports = config;
