import asyncHandler from '../utils/asyncHandler.js';

const getIndexPage = asyncHandler(async (req, res) => {
  res.render('index', { user: req.user });
});

export default {
  getIndexPage,
};
