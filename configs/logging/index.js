const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
<<<<<<< HEAD
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()]
});

 module.exports = logger
=======
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
>>>>>>> 86409b2fd7c2416db0d43a91b2f794e6a524f979
