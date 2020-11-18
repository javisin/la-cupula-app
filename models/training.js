const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Training.init({
    date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Training',
  });
  return Training;
};
