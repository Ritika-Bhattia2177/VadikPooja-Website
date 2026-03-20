import { Router } from 'express';
import { getPandits, createPandit, updatePandit, deletePandit } from '../controllers/panditsController.js';

const router = Router();

router.get('/', getPandits);
router.post('/', createPandit);
router.put('/:id', updatePandit);
router.delete('/:id', deletePandit);

export default router;
