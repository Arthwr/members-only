import winston from 'winston';
import 'winston-daily-rotate-file';

import config from '../config/index.js';
import { NotFoundError } from '../utils/Errors.js';
import { formatErrorLog, formatRegularLog } from './logFormatter.js';

const { format } = winston;

const transports = [];

if (config.environment !== 'production') {
  transports.push(
    new winston.transports.Console({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.colorize({ all: true }),
        format.errors({ stack: true }),
        format.printf((info) => {
          if (info[Symbol.for('level')] === 'error') {
            return formatErrorLog(info);
          }
          return formatRegularLog(info);
        }),
        format.align(),
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
