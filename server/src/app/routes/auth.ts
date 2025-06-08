import express from 'express';
import { login, signUp } from '../controllers/auth';
import { requestPasswordReset, resetPassword } from '../controllers/passwordReset';

const router = express.Router();

router.post('/login', login);
router.post('/sign-up', signUp);
router.post('/password-reset/request', requestPasswordReset);
router.post('/password-reset/reset', resetPassword);

export default router;
