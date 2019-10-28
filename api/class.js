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
router.post('/:id', function(req, res) {
   console.log(req.body);
   res.send('done');
})
router.patch('/:id', async function(req, res) {
   console.log(req);
   res.send('done');
})

router.post('/', async function(req, res) {
   var {name, teacher_id} = req.body;
   var [classObj, created] = await Class.findOrCreate({
      where: {name}
   });
   
   if(created) {
      await UserClass.create({
         userId: teacher_id,
         classId: classObj.id
      });
      res.send('Class created successfully!');
   } else {
      res.send('Class with this name already exist!');
   }
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