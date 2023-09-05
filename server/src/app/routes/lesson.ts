import express from 'express';
import { create, deleteLesson, index } from '../controllers/lesson';

const router = express.Router();

router.get('/', index);
router.post('/', create);
router.delete('/:id', deleteLesson);

export default router;
