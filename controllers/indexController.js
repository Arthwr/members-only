import DatabaseHandler from '../database/services/DatabaseHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

const getIndexPage = asyncHandler(async (req, res) => {
  const posts = await DatabaseHandler.getAllMessages();
  res.render('index', { user: req.user, posts });
});

export default {
  getIndexPage,
};
