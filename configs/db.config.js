require('dotenv').config()

console.log(process.env.USER)
module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USERNAME,
    PASSWORD: process.env.PASSWD,
    DB: process.env.DB,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
