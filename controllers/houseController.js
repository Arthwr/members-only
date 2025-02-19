import asyncHandler from '../utils/asyncHandler.js';

const getHousePage = asyncHandler(async (req, res) => {
  res.render('house');
});

export default {
  getHousePage,
};
