import express from 'express';
import { index, get, update } from '../controllers/user';
import { checkAuthenticated } from '../jwt';

const router = express.Router();

router.get('/', checkAuthenticated, index);
router.get('/:id', checkAuthenticated, get);
router.patch('/:id', checkAuthenticated, update);

export default router;
