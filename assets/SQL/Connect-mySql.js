const mysql = require('mysql2')

const connection = mysql.createConnection({
    user:'root',
    password: 'root',
    host:'localhost',
    port:'8889',
    database: 'mystat',
    waitForConnections : true ,
    connectionLimit : 10 ,
    queueLimit : 0
})

module.exports = connection