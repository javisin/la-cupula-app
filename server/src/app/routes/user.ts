import express from 'express';
import { index, get, update, updateImage } from '../controllers/user';
import { checkAuthenticated } from '../jwt';

const router = express.Router();

router.get('/', checkAuthenticated, index);
router.get('/:id', checkAuthenticated, get);
router.patch('/:id', checkAuthenticated, update);
router.patch('/:id/image', checkAuthenticated, updateImage);

export default router;
