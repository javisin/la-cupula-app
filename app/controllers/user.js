const bcrypt = require('bcrypt');
const generator = require('generate-password');
const { User } = require('../database/models');
const jwtHelper = require('../../jwt');
const mailTransporter = require('../mail/mail');
const invitationMail = require('../mail/invitationMail');
const uploadFile = require('../services/aws/uploadFile');

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

  index: async (req, res) => {
    User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'belt', 'email', 'nickName', 'image'],
    }).then((users) => res.status(200).json(users));
  },

  get: async (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => res.status(200).json(user));
  },

  updatePassword: async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (user) {
      return bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
        if (result) {
          return bcrypt.hash(req.body.newPassword, 10, async (error, hash) => {
            user.password = hash;
            await user.save();
            return res.status(200).json(user);
          });
        }
        return res.status(401).json('Contraseña incorrecta');
      });
    }
    return res.status(401).json('Usuario no encontrado');
  },

  sendInvitation: (req, res) => {
    const { image } = req.files;
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
    });
    bcrypt.hash(password, 10, (err, hash) => {
      req.body.password = hash;
      req.body.image = `https://lacupula.s3.eu-west-2.amazonaws.com/${image.name}`;
      req.body.instructor = false;
      User.create(req.body)
        .then((user) => mailTransporter.sendMail(invitationMail(user, password), (error, info) => {
          if (error) {
            return res.status(500).json('Error en el envío de la invitación');
          }
          return res.status(200).json(info.response);
        }))
        .catch((error) => res.status(400).json({
          error,
        }));
    });
    uploadFile(image);
  },
};
module.exports = controller;
