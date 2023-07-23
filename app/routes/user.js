const express = require('express');
const path = require('path');

const router = express.Router();
const userController = require('../controllers/user');
const { checkAuthenticated } = require('../../jwt');

router.get('/fotico', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'kingte.jpeg'));
}));
router.get('/users', checkAuthenticated, userController.index);
router.get('/user/:id', checkAuthenticated, userController.get);
router.post('/login', userController.login);
router.post('/invite', userController.sendInvitation);
router.put('/updatePassword', userController.updatePassword);

module.exports = router;
