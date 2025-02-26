import asyncHandler from '../utils/asyncHandler.js';

const authAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(404).redirect('/');
  }

  next();
});

export default authAdmin;
