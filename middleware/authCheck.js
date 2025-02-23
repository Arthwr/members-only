import asyncHandler from '../utils/asyncHandler.js';

const authCheck = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.session.error = 'Access denied!';
  console.log(req.session.error);
  res.redirect('/');
});

export default authCheck;
