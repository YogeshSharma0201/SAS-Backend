'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        id: 1,
        firstName: 'Yogesh',
        lastName: 'Sharma',
        email: 'abc@gmail.com',
        password: '1234',
        typeOfUser: 'student',
        macAddress: '9382',
        rollNo: '049'
      }, {
        id: 2,
        firstName: 'Ankit',
        lastName: 'Sharma',
        email: 'abcd@gmail.com',
        password: '1234',
        typeOfUser: 'teacher',
        macAddress: '9382',
        rollNo: ''
      }, {
        id: 3,
        firstName: 'Vishal',
        lastName: 'Pal',
        email: 'abcde@gmail.com',
        password: '1234',
        typeOfUser: 'student',
        macAddress: '9382',
        rollNo: '047'
      }, {
        id: 4,
        firstName: 'sadf',
        lastName: 'xcvdf',
        email: 'asdfs@gmail.com',
        password: '3563436',
        typeOfUser: 'student',
        macAddress: '9382',
        rollNo: '046'
      }, {
        id: 5,
        firstName: 'asfcxvd',
        lastName: 'xcvdf',
        email: 'cvxcv@gmail.com',
        password: '3563436',
        typeOfUser: 'student',
        macAddress: '9382',
        rollNo: '045'
      }, {
        id: 6,
        firstName: 'kjkjcvjks',
        lastName: 'xcvdf',
        email: 'cvxcv@gmail.com',
        password: '3563436',
        typeOfUser: 'teacher',
        macAddress: '9382',
        rollNo: ''
      }, {
        id: 7,
        firstName: 'cmxv,mcv',
        lastName: 'xcvdf',
        email: 'cvxcv@gmail.com',
        password: '3563436',
        typeOfUser: 'student',
        macAddress: '9382',
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
