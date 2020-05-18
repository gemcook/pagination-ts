import * as express from 'express';
import {fruitsHandler} from '../handler';

const router = express.Router();

router.get('/', fruitsHandler.getFruitsPagination);

export default router;
