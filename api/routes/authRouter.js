import { Router } from 'express';

import authController from '../../controllers/authController.js';

const authRouter = Router();

authRouter.get('/', authController.getSignUpPage);
authRouter.post('/', authController.postSignUp);

export default authRouter;
