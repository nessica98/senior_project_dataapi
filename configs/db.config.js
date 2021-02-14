require('dotenv').config()

console.log(process.env.USER)
module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWD,
    DB: process.env.DB,
    dialect: "mysql",
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
