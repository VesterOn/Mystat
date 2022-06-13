const jwt = require("jsonwebtoken")

const connection = require("../../assets/SQL/Connect-mySql")
const {secretKey} = require("../../assets/config/config")
const {validationResult} = require("express-validator");

connection.connect()
//GET:localhost:3001/api/lesson/:id
const getLesson = async (req, res) => {
    const {id} = req.params
    connection.query(`SELECT * FROM lesson WHERE IDSubject=?`, [id], (err, result) => {
        if (result.length === 0) return res.status(404).json({message: `Урок не найден`})
        return res.json({result})
    })
}
//POST:localhost:3001/api/lesson/
const createLesson = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({message: 'Ошибка при создании урока', errors})

    const token = req.headers.authorization.split(' ')[1]
    const {id} = jwt.verify(token, secretKey)

    const {idSubject, description, dateIssued, dateDeadline, file} = req.body

    connection.query(`INSERT INTO lesson(ID,IDSubject ,IDTeacher,Description,DateIssued,DateDeadline,File) VALUES (NULL,?,?,?,?,?)`,
        [idSubject, id, description, dateIssued, dateDeadline, file], (err) => {
        if (err) res.status(400)
        res.status(201)
    })
}

module.exports= {
    getLesson,
    createLesson
}