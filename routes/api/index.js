const examRouter = require('./apiExamRouter')
const groupRouter = require('./apiGroupRouter')
const subjectRouter = require('./apiSubjectRouter')
const lessonRouter = require('./apiLessonRouter')
const studentRouter = require('./apiStudentRouter')
const Router = require('express')

const router = Router()

router.use(examRouter)
router.use(groupRouter)
router.use(subjectRouter)
router.use(lessonRouter)
router.use(studentRouter)

module.exports = router
