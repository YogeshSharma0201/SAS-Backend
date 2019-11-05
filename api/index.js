var express = require('express');
var attendanceRouter = require('./attendance');
var classRouter = require('./class');
var userRouter = require('./user');
var teacherRouter = require('./teacher');
var studentRouter = require('./student');
var {Class, User, UserClass, Attendance} = require('../models');



var router = express.Router();

router.use('/classes', classRouter);
router.use('/users', userRouter);
router.use('/attendances', attendanceRouter);
router.use('/teachers', teacherRouter);
router.use('/students', studentRouter);
router.get('/stats', async function(req, res)  {
    var students = await User.findAll({where: {
       typeOfUser: 'student'
    }});
    var classes = await Class.findAll();
    var teachers = await User.findAll({where: {
       typeOfUser: 'teacher'
    }});
    var attendanceReports = await Attendance.findAll();
    res.send({
       students: students.length,
       classes: classes.length,
       teachers: teachers.length,
       attendanceReports: attendanceReports.length
    })
 })

//export this router to use in our index.js
module.exports = router;