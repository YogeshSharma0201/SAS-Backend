'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Classes', [{
        name: 'English',
        inSession: false,
        teacherId: 2
      }, {
        name: 'Maths',
        inSession: false,
        teacherId: 6
      }, {
        name: 'Science',
        inSession: false,
        teacherId: 2
      }, {
        name: 'Hindi',
        inSession: false,
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
