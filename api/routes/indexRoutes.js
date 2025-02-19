import { Router } from 'express';

import indexController from '../../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.getIndexPage);
indexRouter.get('/sign-up', indexController.getSignUpPage);

export default indexRouter;
