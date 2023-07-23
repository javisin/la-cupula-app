const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {}
  Lesson.init({
    time: DataTypes.DATEONLY,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};
