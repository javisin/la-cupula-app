module.exports = (sequelize, dataTypes) => sequelize.define('User', {
  firstName: {
    type: dataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: dataTypes.STRING,
  },
  nickName: {
    type: dataTypes.STRING,
  },
  email: {
    type: dataTypes.STRING,
    unique: true,
  },
  belt: {
    type: dataTypes.STRING,
  },
  stripes: {
    type: dataTypes.INTEGER,
  },
  password: {
    type: dataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100],
    },
  },
}, {
  // Other model options go here
});
