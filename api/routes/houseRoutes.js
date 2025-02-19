import { Router } from 'express';

import houseController from '../../controllers/houseController.js';

const houseRouter = Router();

houseRouter.get('/', houseController.getHousePage);

export default houseRouter;
