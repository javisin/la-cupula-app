module.exports = (sequelize, dataTypes) => sequelize.define('training', {
  date: {
    type: dataTypes.DATEONLY,
  },
}, {
  // Other model options go here
});
