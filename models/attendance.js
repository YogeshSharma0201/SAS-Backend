'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    classId: DataTypes.UUID
  }, {});
  Attendance.associate = function(models) {
    // associations can be defined here
    Attendance.belongsToMany(models.User, {
      through: 'UserAttendances',
      as: 'users',
      foreignKey: 'attendanceId',
      otherKey: 'userId'
    });

    Attendance.belongsTo(models.Class, {
      as: 'class',
      foreignKey: 'classId',
      constraints: false
    });
  };
  return Attendance;
};