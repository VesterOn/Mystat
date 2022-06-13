const roleMiddleware = require("../../assets/middleware/roleMiddleware")
const {check} = require("express-validator")
const Router = require('express')

const {role} = require("../../assets/config/config")
const {getSubject, createSubject} = require("../../controllers/api")

const subjectRouter = Router()

subjectRouter.get('/subject/:id',roleMiddleware([role.Teacher,role.Student]),getSubject)

subjectRouter.post('/subject/',[roleMiddleware([role.Teacher]),
    check('nameSubject', "Название предмета не может быть больше 64 символов").isLength({max:64})],createSubject)

module.exports = subjectRouter