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
      return res.status(403).render('sign-up', {
        alert: messages.auth.signUpFailed,
      });
    }

    res.status(201).render('sign-in', {
      alert: messages.auth.signUpSuccess(username),
    });
  }),
];

export default {
  getSignUpPage,
  postSignUp,
};
