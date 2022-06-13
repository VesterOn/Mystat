const jwt = require("jsonwebtoken");

const {refreshSecretKey} = require("../../assets/config/config");
const {generateAccessToken} = require("../../public/javascripts/generateToken");
const connection = require("../../assets/SQL/Connect-mySql");

connection.connect()

const generateNewToken = async (req, res) => {

    try {
        const refreshToken = req.headers.authorization.split(' ')[1];

        if (!refreshToken)
            return res.status(401)

        function existToken(refreshToken) {
            return new Promise((resolve) => {
                connection.query(`SELECT EXISTS(SELECT Token FROM refresh WHERE Token=?) AS answer`, [refreshToken],
                    (err, result) => {
                        resolve(result[0].answer)
                    })
            })
        }
        if (!await existToken(refreshToken))
            return res.status(403)

        jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
            if (err)
                return res.status(403)
            const accessToken = generateAccessToken(user.id, user.roles, user.groupOrDepart)
            res.json({accessToken: accessToken})
        })
    } catch (e) {
        console.error(e)
    }
}

const logout = async (req, res) => {
    try {


        const refreshToken = req.headers.authorization.split(' ')[1]
        if (!refreshToken)
            return res.status(401)

        function existToken(refreshToken) {
            return new Promise((resolve) => {
                connection.query(`SELECT EXISTS(SELECT Token FROM refresh WHERE Token=?) AS answer`, [refreshToken],
                    (err, result) => {
                        resolve(result[0].answer)
                    })
            })
        }


        if(await existToken(refreshToken))
        connection.query(`DELETE FROM refresh WHERE refresh.Token=?`,[refreshToken],
                err => {
                    if(err) console.log(err)
                })
        res.status(200).json({message: 'logout successful'})
    } catch (e) {
        console.error(e)
    }
}


module.exports = {
    generateNewToken,
    logout
}