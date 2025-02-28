import { Router } from 'express';

import memberController from '../../controllers/memberController.js';
import { handleSecretMessageErrors } from '../../middleware/handleValidationErrors.js';
import { validateSecretMessage } from '../validators/validators.js';

const memberRouter = Router();

memberRouter.put(
  '/',
  validateSecretMessage(),
  handleSecretMessageErrors,
  memberController.addMember,
);

export default memberRouter;
