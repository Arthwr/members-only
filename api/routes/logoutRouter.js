import { Router } from 'express';

import logoutController from '../../controllers/logoutController.js';

const logoutRouter = Router();

logoutRouter.post('/', logoutController.logout);

export default logoutRouter;
