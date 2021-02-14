require('dotenv').config()

const db_config = {
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    pass:process.env.MYSQL_PASS,
    database:process.env.MYSQL_DB
}

module.exports = db_config;