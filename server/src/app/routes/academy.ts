import express from 'express';
import { checkAuthenticated } from '../jwt';
import { getAcademies } from '../controllers/academy';

const router = express.Router();

router.get('/', checkAuthenticated, getAcademies);

export default router;
