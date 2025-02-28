import { Router } from 'express';

import messageController from '../../controllers/messageController.js';
import { handleUserMessageErrors } from '../../middleware/handleValidationErrors.js';
import { validateUserMessage } from '../validators/validators.js';

const messageRouter = Router();

messageRouter.post(
  '/',
  validateUserMessage(),
  handleUserMessageErrors,
  messageController.postSendMessageEndpoint,
);

export default messageRouter;
