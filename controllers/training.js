const { Training } = require('../models/user');

const controller = {
  create: (req, res) => {
    Training.create({
      UserId: 1,
      date: '2020-10-22',
    })
      .then((training) => res.status(201).json(training))
      .catch(() => res.status(400).json('error'));
  },
};
module.exports = controller;
