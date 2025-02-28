import { body } from 'express-validator';

// prettier-ignore
const validateSignUpCredentials = () => {
  return [
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3, max: 20 }).withMessage('Username must be 3-20 characters long')
      .isAlphanumeric('en-US').withMessage('Username can only contain letters and numbers'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      ),
  ];
};

// prettier-ignore
const validateLoginCredentials = () => {
  return [
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isAlphanumeric('en-US').withMessage('Username can only contain letters and numbers'),

    body('password')
    .notEmpty().withMessage('Password is required'),
  ];
};

const validateUserMessage = () => {
  return [
    body('message')
      .notEmpty()
      .withMessage('Message cannot be empty')
      .isLength({ min: 1, max: 500 })
      .withMessage('Message must be between 1 and 500 characters'),
  ];
};

const validateSecretMessage = () => {
  return [
    body('secret')
      .notEmpty()
      .withMessage('Secret cannot be empty')
      .isLength({ min: 1, max: 10 })
      .withMessage('Our secret is between and 10 characters'),
  ];
};

export {
  validateSignUpCredentials,
  validateLoginCredentials,
  validateUserMessage,
  validateSecretMessage,
};
