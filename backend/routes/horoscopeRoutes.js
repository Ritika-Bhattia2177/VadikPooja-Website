import { Router } from 'express';
import { getHoroscope } from '../controllers/horoscopeController.js';

const router = Router();

router.get('/', getHoroscope);

export default router;
