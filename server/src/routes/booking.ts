import express from 'express';
import { checkAuthenticated } from '../jwt';
import { create, index, deleteBooking, updateBooking } from '../controllers/booking';

const router = express.Router();

router.get('/', checkAuthenticated, index);
router.post('/', checkAuthenticated, create);
router.patch('/:id', checkAuthenticated, updateBooking);
router.delete('/:id', checkAuthenticated, deleteBooking);

export default router;
