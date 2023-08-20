import express from 'express';
import { handleStripe } from '../controllers/stripe';

const router = express.Router();

router.post('/', handleStripe);

export default router;
