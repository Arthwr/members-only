import messages from '../config/messages.js';
import DatabaseHandler from '../database/services/DatabaseHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const result = await DatabaseHandler.deletePost(postId);

  if (!result) {
    req.session.alert = messages.posts.adminCouldntDeletePost;
    return res.status(404).redirect('/');
  }

  req.session.alert = messages.posts.adminDeletePostSuccess;
  return res.status(200).redirect('/');
});

export default {
  deletePost,
};
