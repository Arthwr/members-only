import { Router } from 'express';

import authRouter from './routes/authRouter.js';
import houseRouter from './routes/houseRoutes.js';
import indexRouter from './routes/indexRoutes.js';

const routes = Router();

// 204 status to prevent browser favicon error requests
routes.get('/favicon.ico', (req, res) => res.status(204).end());

routes.use('/', indexRouter);
routes.use('/sign-up', authRouter);
routes.use('/house', houseRouter);

export default routes;
