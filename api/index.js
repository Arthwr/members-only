import { Router } from 'express';

import authCheck from '../middleware/authCheck.js';
import houseRouter from './routes/houseRoutes.js';
import indexRouter from './routes/indexRoutes.js';
import signInRouter from './routes/signInRouter.js';
import signUpRouter from './routes/signUpRouter.js';

const routes = Router();

routes.use('/', indexRouter);
routes.use('/sign-up', signUpRouter);
routes.use('/house', authCheck, houseRouter);
routes.use('/sign-in', signInRouter);

export default routes;
