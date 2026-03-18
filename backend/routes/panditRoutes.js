import { Router } from 'express';
import { getPandits, createPandit } from '../controllers/panditsController.js';

const router = Router();

router.get('/', getPandits);
router.post('/', createPandit);

export default router;
