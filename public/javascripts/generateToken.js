const jwt = require("jsonwebtoken");
const {secretKey, refreshSecretKey} = require("../../assets/config/config");

const generateAccessToken = (id, roles, groupOrDepart) => {
    const payload = {
        id,
        roles,
        groupOrDepart
    }
    return jwt.sign(payload, secretKey, {expiresIn: '15m'})
}
const generateRefreshToken = (id, roles, groupOrDepart) => {
    const payload = {
        id,
        roles,
        groupOrDepart
    }
    return jwt.sign(payload, refreshSecretKey, {expiresIn: '1d'})
}

module.exports = {
    generateRefreshToken,
    generateAccessToken
}