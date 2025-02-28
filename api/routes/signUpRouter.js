import { Router } from 'express';

import signUpController from '../../controllers/signUpController.js';
import { handleSignUpErrors } from '../../middleware/handleValidationErrors.js';
import { validateSignUpCredentials } from '../validators/validators.js';

const signUpRouter = Router();

signUpRouter.get('/', signUpController.getSignUpPage);
signUpRouter.post(
  '/',
  validateSignUpCredentials(),
  handleSignUpErrors,
  signUpController.postSignUp,
);

export default signUpRouter;
