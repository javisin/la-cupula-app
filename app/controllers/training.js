const { Training } = require('../database/models');

const controller = {
  create: (req, res) => {
    Training.create({
      UserId: req.body.userId,
      date: req.body.date,
    })
      .then((training) => res.status(201).json(training))
      .catch((error) => res.status(400).json(error));
  },
  index: (req, res) => {
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
