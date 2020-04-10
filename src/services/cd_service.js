
class CdService {
    dbConn

    constructor(db) {
        this.dbConn = db
        this.create = this.create.bind(this)
        this.updateStock = this.updateStock.bind(this)
    }

    create(data) {
        const sql = `INSERT INTO DISKS (title, category, rate, stock) VALUES (?, ?, ?, ?)`
        return new Promise((resolve, reject) => {
            this.dbConn.query(sql, [data.title, data.category, data.rate, data.stock], (err, results) => {
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

    updateStock(id, stock) {
        const sql = `UPDATE DISKS SET stock = ? WHERE id = ?`
        return new Promise((resolve, reject) => {
            this.dbConn.query(sql, [stock, id], (err, results) => {
                if (err) {
                    reject(err)
                }
                console.log(results)
                resolve("success")
            })
        })
    }
}

module.exports = CdService
