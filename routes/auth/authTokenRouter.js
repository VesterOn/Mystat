const Router = require('express')

const {generateNewToken, logout} = require('../../controllers/auth')

const tokenRouter = Router()

tokenRouter.get('/token', generateNewToken)
tokenRouter.delete('/logout', logout)

module.exports = tokenRouter