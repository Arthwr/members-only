import { Router } from 'express';

import signInController from '../../controllers/signInController.js';

const signInRouter = Router();

signInRouter.get('/', signInController.getSignInPage);
signInRouter.post('/', signInController.postAuthEndpoint);

export default signInRouter;
