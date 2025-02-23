import logger from '../logging/logger.js';
import { AppError } from '../utils/Errors.js';

const errorHandler = (err, req, res, next) => {
  let status = err.status;
  let message = err.message;

  if (!(err instanceof AppError) || !err.expose) {
    status = 500;
    message = 'Internal Server Error';
  }

  const response = { status, message };

  logger.error({
    message: err.message,
    type: err.type,
    route: req.originalUrl,
    method: req.method,
    meta: err.meta,
    stack: err.stack,
    cause: err.cause,
  });

  res.status(response.status).render('errors/error', { response });
};

export default errorHandler;
