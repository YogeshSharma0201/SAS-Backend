'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    typeOfUser: DataTypes.STRING,
    macAddress: DataTypes.STRING,
    netPassword: DataTypes.STRING,
    SSID: DataTypes.STRING,
    rollNo: DataTypes.STRING 
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Class, {
      through: 'UserClasses',
      as: 'classes',
      foreignKey: 'studentId',
      otherKey: 'classId'
    });

    User.hasMany(models.Class, {
      as: 'classesTeaching',
      foreignKey: 'teacherId',
      constraints: false
    }) 

    User.belongsToMany(models.Attendance, {
      through: 'UserAttendances',
      as: 'attendanceReports',
      foreignKey: 'userId',
      otherKey: 'attendanceId'
    });
  };
  return User;
};