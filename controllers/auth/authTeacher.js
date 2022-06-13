const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

const connection = require("../../assets/SQL/Connect-mySql");
const {role} = require("../../assets/config/config");
const {generateAccessToken, generateRefreshToken} = require("../../public/javascripts/generateToken");

connection.connect()

const registrationTeacher = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({message: 'Ошибка при регистрации', errors})

    const {username, password, FIO, IDDepartment} = req.body;

    function existLogin(username) {
        return new Promise((resolve) => {
            connection.query(`SELECT EXISTS(SELECT Login FROM teacher WHERE Login=?) AS answer`, [username],
                (err, result) => {
                    resolve(result[0].answer)
                })
        })
    }

    if (await existLogin(username))
        return res.status(400).json({message: 'Пользователь уже существует'})

    const hashPassword = bcrypt.hashSync(password, 7)

    connection.query(
        `INSERT INTO teacher (ID,IDRole,Login,Password,FIO,IDDepartment) VALUES (NULL,?,?,?,?,?,)`,
        [role.Teacher, username, hashPassword, FIO, IDDepartment],
        (err) => {
            if (err) console.log(err)
        })
    return res.json({message: 'Пользователь успешно зарегистрирован'})

}

const loginTeacher = async (req, res) => {

    const {username, password} = req.body

    function getToken(username, password) {
        return new Promise((resolve) => {
                connection.query(`SELECT * FROM teacher WHERE Login=?`, [username],
                    (err, result) => {
                        if (result.length === 0)
                            return res.status(400).json({message: `Пользователь ${username} не найден`})

                        const firstFind = result[0]
                        const validPassword = bcrypt.compareSync(password, firstFind.Password)
                        if (!validPassword)
                            return res.status(400).json({message: `Введен неверный пароль`})
                        const token = generateAccessToken(firstFind.ID, firstFind.IDRole, firstFind.IDGroup)
                        const refreshToken = generateRefreshToken(firstFind.ID, firstFind.IDRole, firstFind.IDGroup)
                        const user = {
                            id: firstFind.ID,
                            fio: firstFind.FIO,
                        }
                        resolve(refreshToken)
                        return res.json({
                            accessToken: token,
                            refreshToken: refreshToken,
                            user
                        })
                    })
            }
        )
    }

    connection.query(`INSERT INTO refresh (ID,Token,WorksUntil) VALUES (NULL,?,DATE_ADD(NOW(),INTERVAL 1 DAY))`, [await getToken(username, password)],
        (err) => {
            if (err) console.log(err)
        })
}

module.exports = {
    registrationTeacher,
    loginTeacher
}