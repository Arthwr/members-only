import asyncHandler from '../utils/asyncHandler.js';

const messageHandlerMiddleware = asyncHandler(async (req, res, next) => {
  if (req.session.alert) {
    res.locals.alert = req.session.alert;
    delete req.session.alert;
  }

  next();
});

export default { messageHandlerMiddleware };
