const {check} = require('express-validator')
const Router = require('express')

const {registrationStudent, loginStudent} = require('../../controllers/auth')

const studentRouter = Router()

studentRouter.post('/registration/student', [
    check('username', "Имя пользователя не может быть пустым")
        .notEmpty(),
    check('password', 'Пароль должен быть больше 8 и меньше 16 символов')
        .isLength({min: 8, max: 16})
], registrationStudent)
studentRouter.post('/login/student', loginStudent)

module.exports = studentRouter