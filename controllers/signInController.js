import passport from 'passport';

import messages from '../config/messages.js';
import asyncHandler from '../utils/asyncHandler.js';

const getSignInPage = asyncHandler(async (req, res) => {
  if (req.query.error === 'auth') {
    req.session.alert = messages.auth.loginFailed;

    return res.redirect('/sign-in');
  }

  res.render('sign-in');
});

const postAuthEndpoint = [
  passport.authenticate('local', {
    failureRedirect: '/sign-in?error=auth',
  }),
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.redirect('/sign-in');
    }

    res.redirect('/');
  }),
];

export default {
  getSignInPage,
  postAuthEndpoint,
};
