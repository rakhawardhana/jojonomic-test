class OrderService {
    dbConn

    constructor(db){
        this.dbConn = db
        this.create = this.create.bind(this)
        this.createOrder = this.createOrder.bind(this)
    }

    
    // Insert into ORDER_PRODUCTS TABLE (configuring how user could rent many cd)
    create(data) {
        const sql = 'SELECT * FROM DISKS WHERE id = ?'
        const sql2 = 'INSERT INTO ORDER_PRODUCTS (user_id, disk_id, quantity) VALUES (?, ?, ?)'
        const sql3 = 'UPDATE DISKS SET stock = ? WHERE id = ?'
        return new Promise((resolve, reject) => {
            this.dbConn.query(sql, [data.disk_id], (err, results) => {
                if(err) {
                    reject(err)
                }

                // check if order.quantity is not > stock
                if(results[0].stock >= data.quantity) {

                    this.dbConn.query(sql2, [data.user_id, data.disk_id, data.quantity], (err, results2) => {
                        const res = {
                            user_id: data.user_id, 
                            disk_id: data.disk_id, 
                            quantity: data.quantity
                        }


                    this.dbConn.query(sql3, [ results[0].stock - data.quantity, data.disk_id,], (err, results3) => {
                        if(err) {
                            reject(err)
                        }

                        resolve(res) 
                    })
                    })

                }
                else {
                    const res = 'stock exceed!'
                    resolve(res)
                }
            })
        })
    }
    
    // Insert to ORDERS table for configuring total day * rate for each user, and restock the disks after get paid
    createOrder(data){
        const sql2 = `select sum(rate * quantity * ((DATEDIFF((orders.created_at), (order_products.created_at)) + 1))) as data from order_products join disks on order_products.disk_id = disks.id join orders on order_products.user_id = orders.user_id where orders.id = ? `
        const sql = `INSERT INTO ORDERS SET user_id = ?`
        const sql3 = `UPDATE ORDERS SET total_price = ? where user_id = ?`
        const sql4 = `UPDATE DISKS SET stock = (SELECT quantity FROM order_products ORDER BY disk_id LIMIT 1) WHERE stock IS NOT NULL`
        
        return new Promise((resolve, reject) => {
            this.dbConn.query(sql, [data.user_id], (err, results) => {
                if (err) {
                    reject(err)
                }

                this.dbConn.query(sql2, [results.insertId], (err, results2 ) => {
                    this.dbConn.query(sql3, [results2[0].data, data.user_id], (err, results3) => {

                        this.dbConn.query(sql4, (err, results4) => {
                        })

                         const res = {
                             id: results.insertId,
                             user_id: data.user_id,
                                total_price: results2[0].data
                        }
                        
                        resolve(res)

                        })

                    })   
                })
            })
        }   



}

module.exports = OrderService

