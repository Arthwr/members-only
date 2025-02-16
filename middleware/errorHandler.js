import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  const response = {
    status,
    message,
  };

  logger.error(err, { route: req.originalUrl, method: req.method });

  res.status(response.status).render("errors/error", { response });
};

export default errorHandler;
