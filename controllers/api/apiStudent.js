const connection = require("../../assets/SQL/Connect-mySql")
const {log} = require("debug");

connection.connect()
//GET:localhost:3001/api/students/:id
const students = async (req, res) => {
    const {id} = req.params
    //const token = req.headers.authorization.split(' ')[1]
    //const {roles}= jwt.verify(token,secretKey)
    //if(roles===role.Student)
    connection.query(`SELECT ID,FIO,IDGroup,ArrSubject FROM student WHERE IDGroup=?`, [id],
        (err, results) => {
            if (results.length === 0)
                return res.status(400).json({message: `Пользователи по группе ${id} не найден`})

            let result = []

            results.forEach(item=> {
                result.push({
                    id: item.ID,
                    fio: item.FIO,
                    idGroup:item.IDGroup,
                    arrSubject: item.ArrSubject
                })
            })

            return res.json({result})
        })
}
//GET:localhost:3001/api/student/:id
const student = async (req, res) => {
    const {id} = req.params

    connection.query(`SELECT ID,FIO,IDGroup,ArrSubject FROM student WHERE ID=?`, [id],
        (err, result) => {
            if (result.length === 0)
                return res.status(400).json({message: `Пользователь не найден`})
            const firstFind = result[0]
            let student = {
                id: firstFind.ID,
                fio: firstFind.FIO,
                idGroup:firstFind.IDGroup,
                arrSubject: firstFind.ArrSubject
            }
            return res.json({student})
        })

}
//PUT:localhost:3001/api/student/changeSubject/:id?Subject= ?
const editStudentSubject = async (req, res) => {

    let jsonSubject = []
    const {Subject} = req.query
    const {id} = req.params

    function isNullSubject(id) {
        return new Promise((resolve) => {
            connection.query(`SELECT EXISTS(SELECT ID,ArrSubject FROM student WHERE ID=? AND JSON_EXTRACT(ArrSubject,'$') > 0) AS answer `, [id],
                (err, result) => {
                    resolve(result[0].answer)
                })
        })
    }

    function getJsonSubject(id) {
        return new Promise((resolve) => {
            connection.query(`SELECT ArrSubject,ID FROM student WHERE ID=? `, [id], (err, result) => {
                if (result.length === 0) return res.status(404).json({message: `Пользователь не найден`})
                resolve(result[0].ArrSubject)
            })
        })
    }

    if (await isNullSubject(id)) {
        jsonSubject = await getJsonSubject(id)
        jsonSubject = JSON.parse(jsonSubject)

        if (Subject.length !== 0) {
            let hasSubject = false
            jsonSubject.forEach(element => {
                if(element.subject.indexOf(Subject)!== -1)
                    hasSubject = true
            })

            if(!hasSubject)
                jsonSubject.push({subject:Subject})
        }
    }
    if (!await isNullSubject(id)) {
        if (Subject.length !== 0) {
            jsonSubject.push({subject: Subject})
        }
    }
    connection.query(`UPDATE student SET ArrSubject = JSON_REPLACE(ArrSubject,'$',?) WHERE student.ID = ?`, [JSON.stringify(jsonSubject), id],
        err => {
            if (err) return res.status(400)
            return res.status(200).json({message: "Обновился массив предметов"})
        })
}
//PUT:localhost:3001/api/student/changeGroup/:id?Group= ?
const editStudentGroup = async (req, res) => {
    const {Group} = req.query
    const {id} = req.params
    connection.query(`UPDATE student SET IDgroup = ? WHERE student.ID = ?`, [Group, id], err => {
        if (err) res.status(400)
        res.status(200).json('Группа изменилась')
    })
}

module.exports = {
    students, student,
    editStudentGroup, editStudentSubject
}