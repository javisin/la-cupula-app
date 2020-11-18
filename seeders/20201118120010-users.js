module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Carlos',
      lastName: 'Quinteiro Anguita',
      email: 'quinte@example.com',
      password: 'password',
      startDate: '2014-11-18',
      belt: 'purple',
      stripes: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
