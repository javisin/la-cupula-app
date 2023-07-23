import express from 'express';
import { signUp, login } from '../controllers/auth';
const router = express.Router();

router.post('/login', login);
router.post('/sign-up', signUp);

export default router;
