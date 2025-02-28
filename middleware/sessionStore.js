import asyncHandler from '../utils/asyncHandler.js';

const messageHandlerMiddleware = asyncHandler(async (req, res, next) => {
  if (req.session.alert) {
    res.locals.alert = req.session?.alert;
    delete req.session.alert;
  }

  if (req.session.validationErrors) {
    res.locals.validationErrors = req.session.validationErrors;
    delete req.session.validationErrors;
  }

  next();
});

export default { messageHandlerMiddleware };
