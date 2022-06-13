const {getGroup,createGroup} = require('./apiGroup')
const {getSubject,createSubject} = require('./apiSubject')
const {getLesson,createLesson} = require('./apiLesson')
const {getExam,createExam,changeExam} = require('./apiExam')
const {students,student,editStudentSubject,editStudentGroup} = require('./apiStudent')

module.exports = {
    getGroup,createGroup,
    getSubject,createSubject,
    getLesson,createLesson,
    getExam,createExam,changeExam,
    students,student,
    editStudentSubject,editStudentGroup
}