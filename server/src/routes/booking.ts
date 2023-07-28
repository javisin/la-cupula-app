import express from 'express';
import { checkAuthenticated } from '../jwt';
import { create, index } from '../controllers/booking';
const router = express.Router();

router.get('/', checkAuthenticated, index);
router.post('/', checkAuthenticated, create);

export default router;
