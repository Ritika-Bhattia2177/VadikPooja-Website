import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/ordersController.js';

const router = Router();

router.post('/', createOrder);
router.get('/:userId', getOrders);

export default router;
