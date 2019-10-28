const {User, Class, UserClass, Attendance} = require('./models');

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

Class.findAll({
    include: [
        {
            model: User,
            as: 'users',
            required: false,
            through: {
                model: UserClass,
                as: 'userclasses' 
            }
        }
    ]
}).then((data) => {
    console.log(JSON.stringify(data, null, 2));
})
