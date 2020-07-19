const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  // winston.handleExceptions(
  //   new winston.transports.Console({ colorize: true, prettyPrint: true }),
  //   new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  // process.on('unhandledRejection', (ex) => {
  //   throw ex;
  // });

  // winston.add(winston.transports.File, { filename: 'logfile.log' });
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });
}
// const winston = require('winston');
// require('winston-daily-rotate-file');

// function getLogger(module) {

// var transport = new (winston.transports.DailyRotateFile)({
//   filename: './logs/log',
//   datePattern: 'yyyy-MM-dd.',
//   prepend: true,
//   level: process.env.ENV === 'development' ? 'debug' : 'error'
// });

// const logger = new (winston.Logger)({
//   transports: [
//     transport
//   ]
// });
// return logger;
// }

// module.exports = getLogger;
