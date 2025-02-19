import asyncHandler from '../utils/asyncHandler.js';

const getIndexPage = asyncHandler(async (req, res) => {
  res.render('index');
});

const getSignUpPage = asyncHandler(async (req, res) => {
  res.render('sign-up');
});

export default {
  getIndexPage,
  getSignUpPage,
};
