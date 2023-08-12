import express from 'express';
import { create, index, deleteBooking, updateBooking } from '../controllers/booking';
import { checkAuthenticated } from '../jwt';

const router = express.Router();

router.get('/', checkAuthenticated, index);
router.post('/', checkAuthenticated, create);
router.patch('/:id', checkAuthenticated, updateBooking);
router.delete('/:id', checkAuthenticated, deleteBooking);

export default router;
