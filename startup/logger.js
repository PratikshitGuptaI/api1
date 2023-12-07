const { createLogger, transports, format } = require('winston');
const winston = require('winston');

// winston.exceptions.handle(
//     new winston.transports.File({ filename: `logs/uncaughtErrorExceptions.log` }));
  
  require('winston-daily-rotate-file');
const logger = createLogger({
    level: 'error', // Adjust the log level as needed
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({ filename: 'error.log' }),
    ],
});
const apiTransport = new (winston.transports.DailyRotateFile)({
    filename: `${process.cwd()}/logs/api/api-%DATE%.log`,
    datePattern: 'YYYY_MM_DD_HH',
    zippedArchive: false,
    maxSize: '100m',
    maxFiles: '3d'
});


const apiLogger = winston.createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'hh:mm:ss A'
        }),
        format.printf(info => `${info.timestamp} ${info.level} => ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " "))
    ),
    transports: [
        apiTransport
    ]
});
module.exports = {
    logger: logger,
    apiLogger: apiLogger
};