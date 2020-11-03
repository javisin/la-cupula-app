const express = require('express');

const router = express.Router();
const trainingController = require('../controllers/training');

router.post('/trainings', trainingController.create);

module.exports = router;
