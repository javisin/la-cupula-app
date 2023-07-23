'use strict'

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")

router.get('/', (req, res) => res.send('LA CÚPULA'));
router.get('/login', userController.login);
router.get('/register', userController.register);

module.exports = router;
