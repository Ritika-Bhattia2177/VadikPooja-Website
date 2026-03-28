import { Router } from 'express';
import { getPoojas, getPoojaById, createPooja } from '../controllers/poojasController.js';

const router = Router();

router.get('/', getPoojas);
router.get('/:id', getPoojaById);
router.post('/', createPooja); // ✅ THIS LINE IS IMPORTANT

export default router;