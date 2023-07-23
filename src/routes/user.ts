import express from 'express';
import { index, get, bookLesson, indexLessons } from '../controllers/user';
import { checkAuthenticated } from '../jwt';
const router = express.Router();

router.get('/', checkAuthenticated, index);
router.get('/:id', checkAuthenticated, get);
router.post('/:userId/lessons/:lessonId', checkAuthenticated, bookLesson);
router.get('/:userId/lessons', checkAuthenticated, indexLessons);

export default router;
