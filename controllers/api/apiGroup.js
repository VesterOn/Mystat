const jwt = require("jsonwebtoken")

const connection = require("../../assets/SQL/Connect-mySql")
const {secretKey, role} = require("../../assets/config/config")
const {validationResult} = require("express-validator");

connection.connect()

//GET:localhost:3001/api/group
const getGroup = async (req, res) => {
    connection.query(`SELECT * FROM group_`, (err, result) => {
        if (result.length === 0) return res.status(404).json({message: `Группы не найдены`})
        return res.json({result})
    })
}

//POST:localhost:3001/api/group/
const createGroup = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({message: 'Ошибка при создании гурппы', errors})

    const {nameGroup, idDepart} = req.body
    connection.query(`INSERT INTO group_ (ID,NameGroup,IDDepartment ) VALUES (NULL,?,?)`, [nameGroup, idDepart], (err) => {
        if (err) res.status(400)
        res.status(201)
    })
}

module.exports = {
    getGroup,
    createGroup
}