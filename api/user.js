var express = require('express');
var {Class, User, UserClass, Attendance} = require('../models');
var router = express.Router();

router.get('/all', async function(req, res){
   let userObj = await User.findAll();

  if(userObj == null) {
      res.status(404);
      res.send("No Users found!");
   }
   res.send(userObj);
});

router.get('/:id', async function(req, res){
   let userObj = await User.findByPk(req.params.id, {
      include: [
         {
            model: Class,
            as: 'classes',
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
   if(userObj == null) {
      res.status(404);
      res.send("Class with this id not found");
   }
   res.send(userObj);
});

router.post('/', async function(req, res) {
   var {email} = req.body;
   var [userObj, created] = await User.findOrCreate({
      where: {email},
      defaults: {...req.body}
   });
   
   if(created) {
      // await UserClass.create({
      //    userId: teacher_id,
      //    classId: classObj.id
      // });
      res.send(userObj);
   } else {
      res.send('Class with this name already exist!');
   }
})

router.post('/updateWifiConfig', async function(req, res) {
   var user = await User.findByPk(req.body.id);
   user.macAddress = req.body.macAddress;
   user.SSID = req.body.SSID;
   user.netPassword = req.body.netPassword;
   user.save().then((obj)=>{
      res.send('Done');
   })
})

//export this router to use in our index.js
module.exports = router;