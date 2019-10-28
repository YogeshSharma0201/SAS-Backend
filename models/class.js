'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: DataTypes.STRING
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
    Class.belongsToMany(models.User, {
      through: 'UserClasses',
      as: 'students',
      foreignKey: 'classId',
      otherKey: 'studentId'
    });

    Class.hasMany(models.Attendance, {
      as: 'attendanceReports',
      foreignKey: 'classId'
    })

    Class.belongsTo(models.User, {
      as: 'teacher',
      foreignKey: 'teacherId',
      constraints: false
    });
  };
  return Class;
};