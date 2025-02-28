import { Router } from 'express';

import signInController from '../../controllers/signInController.js';
import { handleLoginErrors } from '../../middleware/handleValidationErrors.js';
import { validateLoginCredentials } from '../validators/validators.js';

const signInRouter = Router();

signInRouter.get('/', signInController.getSignInPage);
signInRouter.post(
  '/',
  validateLoginCredentials(),
  handleLoginErrors,
  signInController.postAuthEndpoint,
);

export default signInRouter;
