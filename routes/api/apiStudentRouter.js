const roleMiddleware = require("../../assets/middleware/roleMiddleware")
const Router = require('express')

const {role} = require("../../assets/config/config")
const {students, student, editStudentSubject, editStudentGroup} = require("../../controllers/api")

const studentRouter = Router()

studentRouter.get('/students/:id', roleMiddleware([role.Teacher,role.Student]), students)
studentRouter.get('/student/:id',roleMiddleware([role.Teacher,role.Student]),student)

studentRouter.put('/student/changeSubject/:id',roleMiddleware([role.Teacher]),editStudentSubject)
studentRouter.put('/student/changeGroup/:id',roleMiddleware([role.Teacher]),editStudentGroup)

module.exports = studentRouter