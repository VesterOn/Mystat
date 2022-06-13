const roleMiddleware = require("../../assets/middleware/roleMiddleware")
const Router = require('express')
const {check} = require("express-validator")

const {role} = require("../../assets/config/config")
const {getGroup, createGroup} = require("../../controllers/api")

const groupRouter = Router()

groupRouter.get('/group',roleMiddleware([role.Teacher,role.Student]),getGroup)

groupRouter.post('/group/',[roleMiddleware([role.Teacher]),
    check('nameGroup', "Название группы не может быть больше 14 символов").isLength({max:14})],createGroup)

module.exports = groupRouter;