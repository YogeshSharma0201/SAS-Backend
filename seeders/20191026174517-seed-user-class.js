'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserClasses', [{
        id: '1',
        studentId: '1',
        classId: '1',
      }, {
        id: '2',
        studentId: '1',
        classId: '2',
      }, {
        id: '3',
        studentId: '1',
        classId: '3',
      }, {
        id: '4',
        studentId: '5',
        classId: '1',
      }, {
        id: '5',
        studentId: '3',
        classId: '1',
      }, {
        id: '6',
        studentId: '4',
        classId: '1',
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
