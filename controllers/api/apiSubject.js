const connection = require("../../assets/SQL/Connect-mySql");
const {validationResult} = require("express-validator");

connection.connect()
//GET:localhost:3001/api/subject/:id
const getSubject = async (req, res) => {
    const {id} = req.params
    connection.query(`SELECT * FROM subject WHERE IDGroup =?`, [id], (err, result) => {
        if (result.length === 0)
            return res.json({result})
        return res.json({result})
    })
}
//POST:localhost:3001/api/subject/
const createSubject = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({message: 'Ошибка при создании предмета', errors})

    const {nameSubject, idGroup} = req.body
    connection.query(`INSERT INTO subject(ID,NameSubject,IDGroup) VALUES (NULL,?,?)`, [nameSubject, idGroup], (err) => {
        if (err) res.status(400)
        res.status(201)
    })

}

module.exports = {
    getSubject,
    createSubject
}