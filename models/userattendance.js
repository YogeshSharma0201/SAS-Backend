'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAttendance = sequelize.define('UserAttendance', {
    attendanceId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {});
  UserAttendance.associate = function(models) {
    // associations can be defined here
  };
  return UserAttendance;
};