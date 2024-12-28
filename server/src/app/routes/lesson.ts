import express from 'express';
import { create, deleteLesson, index, update } from '../controllers/lesson';

const router = express.Router();

router.get('/', index);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', deleteLesson);

export default router;
