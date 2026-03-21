import { Router } from 'express';
import { getKits, createKit, getKitById, updateKit, deleteKit } from '../controllers/kitsController.js';

const router = Router();

router.get('/', getKits);
router.post('/', createKit);
router.get('/:id', getKitById);
router.put('/:id', updateKit);
router.delete('/:id', deleteKit);

export default router;
