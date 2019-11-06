var express = require('express');
var {Class, User, UserClass, Attendance} = require('../models');
var router = express.Router();
var {classHelper} = require('../helpers');

router.use(function(req, res, next) {
   res.setHeader('Accept-Ranges', 'classes');
   next();
});

router.get('/', async function(req, res){
   let classObj = await Class.findAll({
      include: [
         {
            model: User,
            as: 'students',
            required: false,
            through: {
               model: UserClass,
               as: 'userclasses' 
            }
         }
      ]
  });

  let newObj = [];
  classObj.forEach(thisobj => {
   thisobj = thisobj.get({ plain: true });
   thisobj.noOfStudents = thisobj.students.length;
   newObj.push(thisobj);
  });

  if(newObj == null) {
      res.status(404);
      res.send("No Classes found!");
   }
   res.setHeader('Content-Range', `classes 0-${classObj.length}/${classObj.length}`);
   res.send(newObj);
});

router.get('/:id', async function(req, res){
   let classObj = await Class.findByPk(req.params.id, {
      include: [
         {
            model: User,
            as: 'students',
            required: false,
            through: {
               model: UserClass,
               as: 'userclasses' 
            }
         },
         {
            model: Attendance,
            as: 'attendanceReports',
            required: false
         }
      ]
  });

   classObj = classObj.get({ plain: true });
   classObj.noOfStudents = classObj.students.length;

   if(classObj == null) {
      res.status(404);
      res.send("Class with this id not found");
   }
   res.send(classObj);
});

router.put('/:id', async function(req, res) {
   console.log(req.body);
   let classObj = await Class.findByPk(req.body.id, {
      include: [
         {
            model: User,
            as: 'students',
            required: false,
            through: {
               model: UserClass,
               as: 'userclasses' 
            }
         },
         {
            model: Attendance,
            as: 'attendanceReports',
            required: false
         }
      ]
   });

   classObj.update(req.body).then((obj)=>{
      let students = req.body.students.map(student => {
         return User.findByPk(student.id);
      });
      Promise.all(students).then((data)=>{
         console.log(data.length);
         obj.setStudents(data).then(msg => {
            console.log(msg);
            res.send('done');
         }).catch(err=>console.log(err));
      }).catch(err=>console.log(err));

   })
})

router.post('/', async function(req, res) {
   var {name, teacherId} = req.body;
   console.log(req.body);
   var [classObj, created] = await Class.findOrCreate({
      where: {name},
      defaults: {teacherId}
   });
   
   if(created) {
      res.send(classObj);
   } else {
      res.send('Class with this name already exist!');
   }
})

router.post('/setSession', async function(req, res) {
   console.log('setSession', req.body.inSession);
   var _class = await Class.findByPk(req.body.id);
   var teacherId = _class.teacherId;
   var teacher = await User.findByPk(teacherId, {
      include: [
         {
            model: Class,
            as: 'classesTeaching',
            required: false
         }
      ]
   })
   console.log(teacher);
   var classes = teacher.classesTeaching;
   var Promises = [];
   for(var i=0; i<classes.length; i++) {
      classes[i].inSession = false;
      Promises.push(classes[i].save());
   }
   Promise.all(Promises).then(()=>{
      _class.inSession = req.body.inSession;
      _class.save().then((obj)=>{
         res.send('Session Set');
      })
   }).catch(err => {
      res.send(err);
   })
})

router.post('/users', function(req, res) {
   var {classId, userId} = req.body;
   UserClass.create({
      userId: userId,
      classId: classId
   }).then((userClassObj)=>{
      if(userClassObj) {
         res.send('Success!');
      } else {
         res.send('Failure!');
      }
   }).catch(err => {
      res.status(500);
      res.send('Error');
   })
})

//export this router to use in our index.js
module.exports = router;