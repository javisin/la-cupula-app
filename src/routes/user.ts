import express from 'express'
import {invite, login} from '../controllers/user'
const router = express.Router();
const { checkAuthenticated } = require('../jwt');

// router.get('/users', checkAuthenticated, userController.index);
// router.get('/user/:id', checkAuthenticated, userController.get);
// router.put('/user/:id', checkAuthenticated, userController.update);
router.post('/login', login);
// router.post('/invite', checkAuthenticated, userController.sendInvitation);
router.post('/invite', invite);
// router.put('/updatePassword', checkAuthenticated, userController.updatePassword);

export default router
