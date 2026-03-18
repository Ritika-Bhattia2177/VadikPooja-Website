import { Router } from 'express';
import { getPandits } from '../controllers/panditsController.js';

const router = Router();

router.get('/', getPandits);

export default router;
