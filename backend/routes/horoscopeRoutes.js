import { Router } from 'express';
import { getProkeralaHoroscope } from '../controllers/horoscopeController.js';


const router = Router();
router.get('/prokerala', getProkeralaHoroscope);

export default router;
