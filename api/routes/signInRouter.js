import { Router } from 'express';

import signInController from '../../controllers/signInController.js';

const signInRouter = Router();

signInRouter.post('/', signInController.postLoginUser);

export default signInRouter;
