import express from 'express';
import { index } from '../controllers/plan';
import { checkAuthenticated } from '../jwt';

const router = express.Router();

router.get('/', checkAuthenticated, index);

export default router;
