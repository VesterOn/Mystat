const jwt = require("jsonwebtoken")

const connection = require("../../assets/SQL/Connect-mySql")
const {secretKey} = require("../../assets/config/config")

connection.connect()
//GET:localhost:3001/api/exam/:id
const getExam = async (req, res) => {
    const {id} = req.params
    connection.query(`SELECT * FROM exam WHERE IDLesson = ?`, [id], (err, result) => {
        if (result.length === 0) return res.status(404)
        return res.json({result})
    })
}
//POST:localhost:3001/api/exam/
const createExam = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, secretKey)

    const {idLesson, fileAnswer, dateFinish} = req.body
    connection.query(`INSERT INTO exam(ID,IDLesson,FileAnswer,Score,IDStudent ,DateFinish) VALUES (NULL,?,?,NULL,?,?)`,
        [idLesson, fileAnswer, id, dateFinish], (err) => {
        if (err) res.status(400)
        res.status(201)
    })
}

//PUT:localhost:3001/api/exam/:id?score = ?
const changeExam = async (req, res) => {
    const {score} = req.query
    const {id} = req.params
    connection.query(`UPDATE exam SET Score =? WHERE exam.ID = ? `, [score, id], (err) => {
        if (err) res.status(400)
        res.status(200)
    })
}

module.exports = {
    getExam,
    createExam,
    changeExam
}