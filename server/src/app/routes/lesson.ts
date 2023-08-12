import express from 'express';
import { create, index } from '../controllers/lesson';

const router = express.Router();

router.get('/', index);
router.post('/', create);

export default router;
