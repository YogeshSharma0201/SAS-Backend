var express = require('express');
var attendanceRouter = require('./attendance');
var classRouter = require('./class');
var userRouter = require('./user');
var teacherRouter = require('./teacher');
var studentRouter = require('./student');


var router = express.Router();

router.use('/classes', classRouter);
router.use('/users', userRouter);
router.use('/attendances', attendanceRouter);
router.use('/teachers', teacherRouter);
router.use('/students', studentRouter);

//export this router to use in our index.js
module.exports = router;