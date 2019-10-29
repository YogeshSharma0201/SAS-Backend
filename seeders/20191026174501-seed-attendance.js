'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Attendances', [{
        classId: '1',
      }, {
        classId: '2',
      }, {
        classId: '1',
      }, {
        classId: '2',
      }, {
        classId: '1',
      }, {
        classId: '2',
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
