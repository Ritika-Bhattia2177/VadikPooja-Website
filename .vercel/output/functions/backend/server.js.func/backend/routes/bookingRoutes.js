import { Router } from 'express';
import { createBooking } from '../controllers/bookingsController.js';

const router = Router();

router.post('/', createBooking);

export default router;
