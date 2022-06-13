const {check} = require('express-validator')
const Router = require('express')

const {registrationTeacher, loginTeacher} = require('../../controllers/auth')

const teacherRouter = Router()

teacherRouter.post('/registration/teacher',[
    check('username', 'Имя пользователя не может быть пустым')
        .notEmpty(),
    check('password', 'Пароль должен быть больше 8 и меньше 16 символов')
        .isLength({min: 8, max: 16})
], registrationTeacher)
teacherRouter.post('/login/teacher', loginTeacher)

module.exports = teacherRouter