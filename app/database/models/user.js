const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    email: DataTypes.STRING,
    belt: DataTypes.STRING,
    stripes: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
