'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Yogesh',
        lastName: 'Sharma',
        email: 'abc@gmail.com',
        password: '1234',
        typeOfUser: 'student',
        macAddress: '9382:34',
        rollNo: '049'
      }, {
        firstName: 'Ankit',
        lastName: 'Sharma',
        email: 'abcd@gmail.com',
        password: '1234',
        typeOfUser: 'teacher',
        macAddress: '9382:838',
        rollNo: ''
      }, {
        firstName: 'Vishal',
        lastName: 'Pal',
        email: 'abcde@gmail.com',
        password: '1234',
        typeOfUser: 'student',
        macAddress: '9382:393',
        rollNo: '047'
      }, {
        firstName: 'sadf',
        lastName: 'xcvdf',
        email: 'asdfs@gmail.com',
        password: '3563436',
        typeOfUser: 'student',
        macAddress: '9382:85',
        rollNo: '046'
      }, {
        firstName: 'asfcxvd',
        lastName: 'xcvdf',
        email: 'cvxcv@gmail.com',
        password: '3563436',
        typeOfUser: 'student',
        macAddress: '9382:493',
        rollNo: '045'
      }, {
        firstName: 'kjkjcvjks',
        lastName: 'xcvdf',
        email: 'cvxcv@gmail.com',
        password: '3563436',
        typeOfUser: 'teacher',
        macAddress: '9382:393',
        rollNo: ''
      }, {
        firstName: 'cmxv,mcv',
        lastName: 'xcvdf',
        email: 'cvxcv@gmail.com',
        password: '3563436',
        typeOfUser: 'student',
        macAddress: '9382:393',
        rollNo: '050'
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
