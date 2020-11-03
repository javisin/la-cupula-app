const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/users', userController.index);
router.get('/user/:id', userController.get);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
