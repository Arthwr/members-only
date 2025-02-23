import { Router } from 'express';

import signUpController from '../../controllers/signUpController.js';

const signUpRouter = Router();

signUpRouter.get('/', signUpController.getSignUpPage);
signUpRouter.post('/', signUpController.postSignUp);

export default signUpRouter;
