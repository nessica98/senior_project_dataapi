const { createLogger, format, transports } = require('winston');
require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
console.log(env)
const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});

module.exports = logger
//logger.info("_AND ME SOTY 2020")
