import winston from "winston";
import config from "../config/index.js";
import "winston-daily-rotate-file";

const { format } = winston;

const transports = [];

if (config.environment !== "production") {
  transports.push(
    new winston.transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        format.errors({ stack: true }),
        format.align(),
        format.printf((info) => `[${info.timestamp}] ${info.level} : ${info.stack || info.message}`)
      ),
    })
  );
} else {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: "logs/combined/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      handleExceptions: true,
      handleRejections: true,
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/errors/errors-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      level: "error",
      handleExceptions: true,
      handleRejections: true,
    })
  );
}

const logger = winston.createLogger({
  level: config.logs.level,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: transports,
});

export default logger;
