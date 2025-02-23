import asyncHandler from '../utils/asyncHandler.js';

const logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect('/');
  });
});

export default {
  logout,
};
