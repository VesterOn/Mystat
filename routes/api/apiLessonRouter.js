const roleMiddleware = require("../../assets/middleware/roleMiddleware")
const {check} = require("express-validator")
const Router = require('express')

const {role} = require("../../assets/config/config")
const {getLesson, createLesson} = require("../../controllers/api")

const lessonRouter = Router()

lessonRouter.get('/lesson/:id',roleMiddleware([role.Teacher,role.Student]),getLesson)

lessonRouter.post('/lesson/',[roleMiddleware([role.Teacher]),
    check('description', "Тема не может быть больше 100 символов").isLength({max:100})],createLesson)

module.exports = lessonRouter