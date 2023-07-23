const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const { checkAuthenticated } = require('../../jwt');

router.get('/users', checkAuthenticated, userController.index);
router.get('/user/:id', checkAuthenticated, userController.get);
router.put('/user/:id', checkAuthenticated, userController.update);
router.post('/login', userController.login);
router.post('/invite', checkAuthenticated, userController.sendInvitation);
router.put('/updatePassword', checkAuthenticated, userController.updatePassword);

module.exports = router;
