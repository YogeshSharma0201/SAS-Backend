'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserClasses', [{
        studentId: '1',
        classId: '1',
      }, {
        studentId: '1',
        classId: '2',
      }, {
        studentId: '1',
        classId: '3',
      }, {
        studentId: '5',
        classId: '1',
      }, {
        studentId: '3',
        classId: '1',
      }, {
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
