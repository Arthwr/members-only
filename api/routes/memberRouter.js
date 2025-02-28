import { Router } from 'express';

import memberController from '../../controllers/memberController.js';
import { handleSecretMessageErrors } from '../../middleware/handleValidationErrors.js';
import { messageLimiter } from '../../middleware/limiter.js';
import { validateSecretMessage } from '../validators/validators.js';

const memberRouter = Router();

memberRouter.put(
  '/',
  validateSecretMessage(),
  handleSecretMessageErrors,
  messageLimiter,
  memberController.addMember,
);

export default memberRouter;
