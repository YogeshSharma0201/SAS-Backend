var express = require('express');
var {Class, User, UserClass, Attendance} = require('../models');
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