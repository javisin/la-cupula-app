import express from 'express';
import { getCheckoutSession } from '../controllers/checkout';
import { checkAuthenticated } from '../jwt';

const router = express.Router();

router.get('/', checkAuthenticated, getCheckoutSession);

export default router;
