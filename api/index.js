import { Router } from 'express';

import authAdmin from '../middleware/authAdmin.js';
import authMiddleware from '../middleware/authMiddleware.js';
import sessionStore from '../middleware/sessionStore.js';
import indexRouter from './routes/indexRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import messageRouter from './routes/messageRouter.js';
import postsRouter from './routes/postsRouter.js';
import signInRouter from './routes/signInRouter.js';
import signUpRouter from './routes/signUpRouter.js';

const routes = Router();

// Persist message to client and remove them
routes.use(sessionStore.messageHandlerMiddleware);

routes.use('/sign-in', signInRouter);
routes.use('/sign-up', signUpRouter);
routes.use('/logout', logoutRouter);
routes.use('/message', authMiddleware, messageRouter);
routes.use('/posts', authMiddleware, authAdmin, postsRouter);
routes.use('/', authMiddleware, indexRouter);

export default routes;
