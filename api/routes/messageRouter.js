import { Router } from 'express';

import messageController from '../../controllers/messageController.js';

const messageRouter = Router();

messageRouter.post('/', messageController.postSendMessageEndpoint);

export default messageRouter;
