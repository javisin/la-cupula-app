const express = require('express');

const router = express.Router();
const trainingController = require('../controllers/training');

router.post('/trainings', trainingController.create);
router.put('/trainings/:id', trainingController.update);
router.delete('/trainings/:id', trainingController.delete);
router.get('/trainings', trainingController.index);
router.get('/trainings/:userId', trainingController.indexByUser);

module.exports = router;
