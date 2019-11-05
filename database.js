var {Class, User, UserClass, Attendance, UserAttendance} = require('./models');

// User.create({ 
//     email: "Jane",
//     password: "Doe", 
//     macAddress: "8282", 
//     typeOfUser: "student" 
// }).then(jane => {
//     console.log("Jane's auto-generated ID:", jane.id);
//   });

// // User.findOne({ where: {email: 'Jane;'} }).then(function(user) {
// //     console.log(user.password);
// // }).catch(err => console.log(err));

// Class.create({
//     name: "English Class"
// })

// User.findAll({
//     include: [
//         {
//             model: Class,
//             as: 'classes',
//             required: false,
//             through: {
//                 model: UserClass,
//                 as: 'userclasses'
//             }
//         }
//     ]
// }).then((data) => {
//     console.log(JSON.stringify(data[0], null, 2));
// })

// Class.findAll({
//     include: [
//         {
//             model: User,
//             as: 'users',
//             required: false,
//             through: {
//                 model: UserClass,
//                 as: 'userclasses' 
//             }
//         }
//     ]
// }).then((data) => {
//     console.log(JSON.stringify(data, null, 2));
// })



User.findByPk(1, {
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
                return attendee.id == 1;
            }).length >= 1;
        }).length;
        asum += obj.totUserAttendances;
        bsum += obj.totAttendances;
        result.push(obj);
    }

    console.log({
        TotalAttendance: Math.round((asum/bsum)*10000)/100,
        classWiseAttendance: result
    });
 })

