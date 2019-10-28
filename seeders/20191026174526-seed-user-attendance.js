'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserAttendances', [{
        id: '1',
        attendanceId: '1',
        userId: '1',
      }, {
        id: '2',
        attendanceId: '1',
        userId: '2',
      }, {
        id: '3',
        attendanceId: '1',
        userId: '3',
      }, {
        id: '4',
        attendanceId: '1',
        userId: '4',
      }, {
        id: '5',
        attendanceId: '1',
        userId: '5',
      }, {
        id: '6',
        attendanceId: '2',
        userId: '1',
      }, {
        id: '7',
        attendanceId: '2',
        userId: '2',
      }, {
        id: '8',
        attendanceId: '2',
        userId: '3',
      }, {
        id: '9',
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
