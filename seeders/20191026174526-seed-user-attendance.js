'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserAttendances', [{
        attendanceId: '1',
        userId: '1',
      }, {
        attendanceId: '1',
        userId: '2',
      }, {
        attendanceId: '1',
        userId: '3',
      }, {
        attendanceId: '1',
        userId: '4',
      }, {
        attendanceId: '1',
        userId: '5',
      }, {
        attendanceId: '2',
        userId: '1',
      }, {
        attendanceId: '2',
        userId: '2',
      }, {
        attendanceId: '2',
        userId: '3',
      }, {
        attendanceId: '2',
        userId: '4',
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
