
class UserService {
    dbConn

    constructor(db) {
        this.dbConn = db
        this.create = this.create.bind(this)
    }

    // Add customer
    create(data) {
        const sql = `INSERT INTO CUSTOMERS (name) VALUES (?)`
        return new Promise((resolve, reject) => {
            this.dbConn.query(sql, [data.name], (err, results) => {
                if (err) {
                    reject(err)
                }
                const res = {
                    id: results.insertId,
                    ...data,
                }
                resolve(res)
            })
        })
    }

    
}

module.exports = UserService
