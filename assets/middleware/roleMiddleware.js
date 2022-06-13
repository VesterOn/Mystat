const jwt = require('jsonwebtoken')
const {secretKey} = require('../config/config')

module.exports = function (roles){
    return (req,res,next)=>{
        if(req.method === 'OPTIONS')
            next()

        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token)
                return res.status(403).json({message:'Пользователь не авторизован!!!'})
            const {roles:userRoles}= jwt.verify(token,secretKey)
            let hasRole = false

            if(roles.includes(userRoles))
                hasRole = true

            if(!hasRole)
                return res.status(403).json({message:'У вас нет доступа'})

            next()

        }catch (e) {
            console.log(e)
            res.status(403).json({message:'Пользователь не авторизован'})
        }
    }
}