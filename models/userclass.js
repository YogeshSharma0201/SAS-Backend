'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserClass = sequelize.define('UserClass', {
    studentId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER
  }, {});
  UserClass.associate = function(models) {
    // associations can be defined here
  };
  return UserClass;
};