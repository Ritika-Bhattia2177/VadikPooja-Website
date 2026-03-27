import express from 'express';
import { getProkeralaPanchang } from '../controllers/panchangController.js';
const router = express.Router();

// Panchang route using Prokerala OAuth logic
router.get('/', getProkeralaPanchang);

export default router;
