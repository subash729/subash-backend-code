import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const { combine, timestamp, json, printf } = winston.format;

// Defining a format for console logging
const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
   // saving log in file
    new winston.transports.File({
      filename: 'combined.log',
    }),
    // displaying console
    new winston.transports.Console({
      format: combine(
        timestamp(),
        consoleFormat
      )
    }),
    new ElasticsearchTransport({
      clientOpts: {
         node: 'http://es01:9200',
         auth: {
           username: 'elastic',
           password: 'changeme'
         }
        }
    })
  ],
});

logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');


export default logger