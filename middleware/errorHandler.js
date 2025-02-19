import { AppError } from '../utils/Errors.js';
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  let status = err.status;
  let message = err.message;

  if (!(err instanceof AppError)) {
    status = 500;
    message = 'Internal Server Error';
  }

  const response = { status, message };

  logger.error(err, {
    message: err.message,
    type: err.type || 'UnknownError',
    route: req.originalUrl,
    method: req.method,
    meta: err.meta || {},
    stack: err.stack,
    cause: err.cause ? err.cause.stack : undefined,
  });
  res.status(response.status).render('errors/error', { response });
};

export default errorHandler;
