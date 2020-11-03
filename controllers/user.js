const bcrypt = require('bcrypt');
const { User } = require('../db');
const jwtHelper = require('../jwt');

const controller = {
  login: async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwtHelper.createToken(user);
          return res.status(200).json(token);
        }
        return res.status(401).json('usuario no existente');
      });
    }
    return res.status(401).json('usuario no existente');
  },

  register: async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      req.body.password = hash;
      User.create(req.body)
        .then((user) => res.status(201).json({
          user,
        }))
        .catch(() => res.status(400).json({
          error: 'unknown',
        }));
    });
  },

  index: async (req, res) => {
    User.findAll({
      attributes: ['id', 'firstname', 'lastname', 'belt', 'email', 'nickname'],
    }).then((users) => res.status(200).json(users));
  },

  get: async (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => res.status(200).json(user));
  },
};
module.exports = controller;
