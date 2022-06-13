const roleMiddleware = require("../../assets/middleware/roleMiddleware")
const Router = require('express')

const {role} = require("../../assets/config/config")
const {getExam, createExam, changeExam} = require("../../controllers/api")

const examRouter = Router()
examRouter.get('/exam',roleMiddleware([role.Teacher,role.Student]),getExam)

examRouter.post('/exam/',roleMiddleware([role.Student]),createExam)

examRouter.put('/exam/:id',roleMiddleware([role.Teacher]),changeExam)

module.exports = examRouter