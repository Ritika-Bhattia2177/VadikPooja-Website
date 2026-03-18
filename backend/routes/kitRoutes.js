import { Router } from 'express';
import { getKits, createKit } from '../controllers/kitsController.js';

const router = Router();

router.get('/', getKits);
router.post('/', createKit);

export default router;
