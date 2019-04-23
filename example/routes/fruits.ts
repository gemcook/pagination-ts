import * as express from 'express';
import {fruitsHandler} from '../handler';
const router = express.Router();

router.get('/', fruitsHandler.getFruitsPaging);

export default router;