require('dotenv').config({ path: '.env' });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SECRET_OR_KEY: process.env.SECRET_OR_KEY
};
