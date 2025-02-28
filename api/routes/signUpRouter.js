import { Router } from 'express';

import signUpController from '../../controllers/signUpController.js';
import { handleSignUpErrors } from '../../middleware/handleValidationErrors.js';
import { signUpLimiter } from '../../middleware/limiter.js';
import { validateSignUpCredentials } from '../validators/validators.js';

const signUpRouter = Router();

signUpRouter.get('/', signUpController.getSignUpPage);
signUpRouter.post(
  '/',
  validateSignUpCredentials(),
  signUpLimiter,
  handleSignUpErrors,
  signUpController.postSignUp,
);

export default signUpRouter;
