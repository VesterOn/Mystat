const {logout,generateNewToken} = require('./authToken')
const {loginTeacher,registrationTeacher} = require('./authTeacher')
const {loginStudent,registrationStudent} = require('./authStudent')

module.exports={
    logout,generateNewToken,
    loginTeacher,registrationTeacher,
    loginStudent,registrationStudent
}