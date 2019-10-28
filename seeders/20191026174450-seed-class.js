'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Classes', [{
        id: 1,
        name: 'English',
        teacherId: 2
      }, {
        id: 2,
        name: 'Maths',
        teacherId: 6
      }, {
        id: 3,
        name: 'Science',
        teacherId: 2
      }, {
        id: 4,
        name: 'Hindi',
        teacherId: 6
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
