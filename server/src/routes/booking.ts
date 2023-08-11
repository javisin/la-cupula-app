import express from 'express';
import { checkAuthenticated } from '../jwt';
import { create, index, deleteBooking } from '../controllers/booking';

const router = express.Router();

router.get('/', checkAuthenticated, index);
router.post('/', checkAuthenticated, create);
router.delete('/:id', checkAuthenticated, deleteBooking);

export default router;
