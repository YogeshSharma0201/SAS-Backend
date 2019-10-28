const classHelper = (thisobj) => {
    thisobj = thisobj.get({ plain: true });
    let usersObj = thisobj.users;
    let teacher = usersObj.filter(obj => obj.typeOfUser === 'teacher')[0];
    let students = usersObj.filter(obj => obj.typeOfUser === 'student');
    delete thisobj.users;
    thisobj.teachers = teacher;
    thisobj.noOfStudents = students.length;
    thisobj.students = students;
    return thisobj;
}

module.exports = {
    classHelper 
}