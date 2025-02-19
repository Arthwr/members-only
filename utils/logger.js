import winston from 'winston';
import 'winston-daily-rotate-file';

import config from '../config/index.js';
import { NotFoundError } from './Errors.js';

const { format } = winston;

const transports = [];

if (config.environment !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.errors({ stack: true }),
        format.align(),
        format.printf((info) => {
          const metaString =
            info.meta && Object.keys(info.meta).length > 0
              ? `\n ${JSON.stringify(info.meta)}`
              : '';
          return `[${info.timestamp}]:${info.level} ${
            info.stack || info.message
          } ${metaString}`;
        }),
      ),
    }),
  );
} else {
  // Not logging 404 errors
  const NotFoundFilter = format((info) => {
    if (info.error instanceof NotFoundError) {
      return false;
    }

    return info;
  });

  transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(NotFoundFilter(), format.json()),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/errors/errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(NotFoundFilter(), format.json()),
    }),
  );
}

const logger = winston.createLogger({
  level: config.logs.level,
  transports: transports,
});

export default logger;
