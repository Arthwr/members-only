import messages from '../config/messages.js';
import DatabaseHandler from '../database/services/DatabaseHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

const getSignUpPage = asyncHandler(async (req, res) => {
  res.render('sign-up');
});

const postSignUp = [
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await DatabaseHandler.addUser(username, password);

    if (!result) {
      req.session.alert = messages.auth.signUpFailed;
      return res.status(403).redirect('sign-up');
    }

    req.session.alert = messages.auth.signUpSuccess(username);
    res.status(201).redirect('sign-in');
  }),
];

export default {
  getSignUpPage,
  postSignUp,
};
