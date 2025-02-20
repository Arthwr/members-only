import DatabaseHandler from '../database/services/DatabaseHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
import capitalizeString from '../utils/capitalizeString.js';

const getSignUpPage = asyncHandler(async (req, res) => {
  res.render('sign-up');
});

const postSignUp = [
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await DatabaseHandler.addUser(username, password);

    if (!result) {
      return res.status(403).render('sign-up', {
        alert: {
          variant: 'warning',
          message: `The username is unavailable or invalid.`,
          detail: 'Please select another.',
        },
      });
    }

    res.status(201).render('index', {
      alert: {
        variant: 'success',
        message: `Thanks for joining us, ${capitalizeString(result.username)}!`,
        detail: `You can now safely log in with your credentials.`,
      },
    });
  }),
];

export default {
  getSignUpPage,
  postSignUp,
};
