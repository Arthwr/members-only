import asyncHandler from '../utils/asyncHandler.js';

const authCheck = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect('/sign-in');
});

export default authCheck;
