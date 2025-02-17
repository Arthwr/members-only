import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  const response = {
    status,
    message,
  };

  if (!(err instanceof AppError)) {
    logger.error(err, { route: req.originalUrl, method: req.method });
    return res.status(response.status).render("errors/error", {
      response: {
        status: 500,
        message: "Internal Server Error",
      },
    });
  }

  logger.error(err, { route: req.originalUrl, method: req.method });

  res.status(response.status).render("errors/error", { response });
};

export default errorHandler;
