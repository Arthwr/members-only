import { Router } from 'express';

import memberController from '../../controllers/memberController.js';

const memberRouter = Router();

memberRouter.put('/', memberController.addMember);

export default memberRouter;
