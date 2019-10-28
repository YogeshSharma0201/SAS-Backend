'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Attendances', [{
        id: '1',
        classId: '1',
      }, {
        id: '2',
        classId: '2',
      }, {
        id: '3',
        classId: '1',
      }, {
        id: '4',
        classId: '2',
      }, {
        id: '5',
        classId: '1',
      }, {
        id: '6',
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
