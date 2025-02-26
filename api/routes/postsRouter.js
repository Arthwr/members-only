import { Router } from 'express';

import postsController from '../../controllers/postsController.js';

const postsRouter = Router();

postsRouter.post('/:id', postsController.deletePost);

export default postsRouter;
