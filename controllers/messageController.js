import messages from '../config/messages.js';
import DatabaseHandler from '../database/services/DatabaseHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

const postSendMessageEndpoint = asyncHandler(async (req, res) => {
  if (!req.user) {
    req.session.alert = messages.posts.unknownPostMessageError;
    console.log(req.session.alert);
    return res.status(403).redirect('/sign-in');
  }

  const { username } = req.user;
  const { message } = req.body;

  const result = await DatabaseHandler.storeMessage(username, message);

  if (!result) {
    req.session.alert = messages.posts.userFailedToPost;
    return res.status(403).redirect('/');
  }

  req.session.alert = messages.posts.userSuccessfullPost;
  res.status(200).redirect('/');
});

export default {
  postSendMessageEndpoint,
};
