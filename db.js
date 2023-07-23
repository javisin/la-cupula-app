const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./models/user');
const trainingModel = require('./models/training');

const sequelize = new Sequelize('la_cupula', 'javisin', 'Javisin1098', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = userModel(sequelize, DataTypes);
const Training = trainingModel(sequelize, DataTypes);
Training.belongsTo(User);

sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
  sequelize.sync({ force: true });
});

module.exports = {
  User,
  Training,
};
