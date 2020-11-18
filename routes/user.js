const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const { checkAuthenticated } = require('../jwt');

router.get('/users', checkAuthenticated, userController.index);
router.get('/user/:id', checkAuthenticated, userController.get);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
