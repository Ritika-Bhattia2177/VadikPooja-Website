import { Router } from 'express';
import { getKits } from '../controllers/kitsController.js';

const router = Router();

router.get('/', getKits);

export default router;
