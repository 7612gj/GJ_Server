
const path = require('path');
const winston = require('winston');
const fs = require('fs');
require('date-utils');

module.exports = function(dirname){
  var logDir = path.join(__dirname, '/../log', dirname);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const tsFormat = () => new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
  const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'info',
        timestamp: tsFormat,
        colorize: true
     }),
      new (require('winston-daily-rotate-file'))({
        json: false,
        level: 'info',
        filename: `${logDir}/-logs.log`,
        datePattern: 'yyyy-MM-dd',
        prepend: true,
        timestamp: tsFormat,
        maxsize: 104857600,
        maxFiles: 5
      })
    ]
    // ,
    // exceptionHandlers: [ // uncaughtException 발생시 처리
    //     new (require('winston-daily-rotate-file'))({
    //             name: 'exception-file',
    //             filename: `${logDir}/-error-logs.log`,
    //             datePattern: 'yyyy-MM-dd',
    //             colorize: true,
    //             maxsize: 104857600,
    //             maxFiles: 5,
    //             level: ERROR_LEVEL,
    //             showLevel: true,
    //             json: false,
    //             timestamp: tsFormat
    //     }),
    //     new (winston.transports.Console)({
    //             name: 'exception-console',
    //             colorize: true,
    //             level: ERROR_LEVEL,
    //             showLevel: true,
    //             json: false,
    //             timestamp: tsFormat
    //     })
    // ]
  });

  logger.rewriters.push(function(level, msg, meta) {
    if (meta.client) {
      var ip = meta.client.headers['x-forwarded-for'] ||
         meta.client.connection.remoteAddress ||
         meta.client.socket.remoteAddress ||
         meta.client.connection.socket.remoteAddress;
      var url = meta.client.originalUrl
      meta.client = `[ip] ${ip}\t[url] ${url}`;
    }
    return meta;
  });
  return logger;
}
