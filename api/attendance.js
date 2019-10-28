var express = require('express');
var {Class, User, UserClass, Attendance, UserAttendance} = require('../models');
var router = express.Router();

router.get('/', async function(req, res){
   let attendanceObj = await Attendance.findAll({
      include: [
         {
            model: Class,
            as: 'class'
         },
         {
            model: User,
            as: 'users',
            required: false,
            through: {
               model: UserAttendance,
               as: 'UserAttendances'
            }
         }
      ]
   });

  if(attendanceObj == null) {
      res.status(404);
      res.send("No Attendance Reports found!");
   }
   res.setHeader('Content-Range', `attendances 0-${attendanceObj.length}/${attendanceObj.length}`)
   res.send(attendanceObj);
});

router.get('/:id', async function(req, res){
   let attendanceObj = await Attendance.findByPk(req.params.id, {
      include: [
         {
            model: Class,
            as: 'class'
         },
         {
            model: User,
            as: 'users',
            required: false,
            through: {
               model: UserAttendance,
               as: 'UserAttendances'
            }
         }
      ]
  });
   if(attendanceObj == null) {
      res.status(404);
      res.send("Class with this id not found");
   }
   res.send(attendanceObj);
});

router.post('/', async function(req, res) {
   var {classId, students} = req.body;
   var attendance = await Attendance.create({classId});
   var Promises = [];
   students.forEach((student)=>{
      var promise = UserAttendance.create({
         attendanceId: attendance.id,
         userId: student
      })
      Promises.push(promise);
   })
   Promise.all(Promises).then((data)=>{
      console.log(data);
      res.send('Success');
   }).catch(err=> {
      res.status(500);
      res.send('Error');
   })
})

//export this router to use in our index.js
module.exports = router;