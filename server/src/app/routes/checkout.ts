import express from 'express';
import { getCheckoutSession } from '../controllers/checkout';

const router = express.Router();

router.get('/', getCheckoutSession);

export default router;
