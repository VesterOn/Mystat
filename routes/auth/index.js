const studentRouter = require('./authStudentRouter')
const teacherRouter = require('./authTeacherRouter')
const tokenRouter = require('./authTokenRouter')
const Router = require('express')

const router = Router()

router.use(studentRouter)
router.use(teacherRouter)
router.use(tokenRouter)

module.exports = router