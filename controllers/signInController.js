import passport from 'passport';

import asyncHandler from '../utils/asyncHandler.js';

const postLoginUser = [
  passport.authenticate('local', {
    failureRedirect: '/',
  }),
  asyncHandler(async (req, res) => {
    console.log('Authenticated User:', req.user); // Debugging line
    if (!req.user) {
      return res.redirect('/');
    }

    res.render('house', { user: req.user });
  }),
];

export default {
  postLoginUser,
};
