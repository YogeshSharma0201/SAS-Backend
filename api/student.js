var express = require('express');
var {Class, User, UserClass, Attendance, UserAttendance} = require('../models');
var router = express.Router();

router.get('/', async function(req, res){
   let userObj = await User.findAll({where: {typeOfUser: 'student'}});

  if(userObj == null) {
      res.status(404);
      res.send("No Users found!");
   }

   res.setHeader('Content-Range', `students 0-${userObj.length}/${userObj.length}`)
   res.send(userObj);
});

router.get('/attendanceReports/:id', async function(req, res) {
   User.findByPk(req.params.id, {
      include : [
         {
            model: Class,
            as: 'classes',
            required: false,
            through: {
               model: UserClass,
               as: 'userclasses' 
            },
            include: [{
               model: User,
               as: 'teacher'
            }, {
               model: Attendance,
               as: 'attendanceReports',
               include: [{
                  model: User,
                  as: 'users',
                  through: {
                     model: UserAttendance,
                     as: 'userattendances'
                  }
               }]
            }],
         },
      ]
   }).then(async (obj)=>{
      let classes = obj.classes;
      var result = [];
      var asum = 0, bsum = 0;
      for(var i=0; i<classes.length; i++) {
          var obj = {};
          obj.className = classes[i].name;
          var attendanceReports = classes[i].attendanceReports;
          obj.totAttendances = attendanceReports.length;
          obj.totUserAttendances  = attendanceReports.filter((attendanceReport)=>{
              var attendees = attendanceReport.users;
              return attendees.filter((attendee) => {
                  return attendee.id == req.params.id;
              }).length >= 1;
          }).length;
          asum += obj.totUserAttendances;
          bsum += obj.totAttendances;
          result.push(obj);
      }
        res.send({
         TotalAttendance: Math.round((asum/bsum)*10000)/100,
         classWiseAttendance: result
     })
   }).catch(()=>{
      res.status(404);
      res.send("Student with this id not found");
   })
})

router.get('/:id', async function(req, res){
   let userObj = await User.findByPk(req.params.id, {
      include : [
         {
            model: Class,
            as: 'classes',
            required: false,
            through: {
               model: UserClass,
               as: 'userclasses' 
            },
            include: [{
               model: User,
               as: 'teacher'
            }]
         },
      ]
  });
   if(userObj == null) {
      res.status(404);
      res.send("Student with this id not found");
   }
   res.send(userObj);
});

router.post('/', async function(req, res) {
   var {email} = req.body;
   var [userObj, created] = await User.findOrCreate({
      where: {email},
      defaults: {...req.body, typeOfUser: 'student'}
   });
   
   if(created) {
      res.send(userObj);
   } else {
      res.send('Student with this name already exist!');
   }
})

//export this router to use in our index.js
module.exports = router;