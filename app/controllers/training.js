const { Training } = require('../database/models');
const { User } = require('../database/models');

const controller = {
  create: (req, res) => {
    Training.create({
      UserId: req.body.userId,
      date: req.body.date,
      verified: false,
    })
      .then((training) => res.status(201).json(training))
      .catch((error) => res.status(400).json(error));
  },
  index: (req, res) => {
    Training.findAll({
      where: {
        verified: false,
      },
      include: [{ model: User, attributes: ['nickName', 'image'] }],
      order: [['createdAt', 'ASC']],
    }).then((trainings) => res.status(200).json(trainings))
      .catch((error) => res.status(400).json({ error }));
  },

  update: (req, res) => {
    Training.findOne({
      where: {
        id: req.params.id,
      },
    }).then(async (training) => {
      await training.update({
        verified: true,
      });
      res.status(200).json(training);
    }).catch(() => res.status(404).json({ message: 'Entrenamiento no encontrado' }));
  },

  delete: (req, res) => {
    Training.findOne({
      where: {
        id: req.params.id,
      },
    }).then(async (training) => {
      await training.destroy();
      res.status(200).json(training);
    }).catch(() => res.status(404).json({ message: 'Entrenamiento no encontrado' }));
  },

  indexByUser: (req, res) => {
    Training.findAll({
      where: {
        UserId: req.params.userId,
      },
      limit: req.query.limit ? parseInt(req.query.limit, 10) : null,
      order: [['createdAt', 'DESC']],
    }).then((trainings) => res.status(200).json(trainings))
      .catch((error) => res.status(400).json({ error }));
  },
};
module.exports = controller;
