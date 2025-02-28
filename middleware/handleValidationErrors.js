import { validationResult } from 'express-validator';

import asyncHandler from '../utils/asyncHandler.js';

const handleValidationErrors = (redirectPath) =>
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.validationErrors = errors.array().map((err) => err.msg);

      if (
        req.headers.accept &&
        req.headers.accept.includes('application/json')
      ) {
        return res.status(400).json({ redirect: redirectPath });
      }

      return res.status(400).redirect(redirectPath);
    }

    next();
  });

export const handleSignUpErrors = handleValidationErrors('/sign-up');
export const handleLoginErrors = handleValidationErrors('/sign-in');
export const handleUserMessageErrors = handleValidationErrors('/');
export const handleSecretMessageErrors = handleValidationErrors('/');
