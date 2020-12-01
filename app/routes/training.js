const express = require('express');

const router = express.Router();
const trainingController = require('../controllers/training');

router.post('/trainings', trainingController.create);
router.get('/trainings/:userId', trainingController.index);

module.exports = router;
