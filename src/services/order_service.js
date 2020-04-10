class OrderService {
    dbConn

    constructor(db){
        this.dbConn = db
      
        
    }

    create(data) {
                const sql = 'SELECT * FROM DISKS WHERE id = ?'
                const sql2 = 'INSERT INTO ORDER_PRODUCTS (user_id, disk_id, quantity) VALUES (?, ?, ?)'
                const sql3 = 'UPDATE DISKS SET stock = ? WHERE id = ?'
                return new Promise((resolve, reject) => {
                    this.dbConn.query(sql, [data.disk_id], (err, results) => {
                        if(err) {
                            reject(err)
                        }
        
                        // check if order.quantity is not > stock
                        if(results[0].stock >= data.quantity) {
        
                        this.dbConn.query(sql2, [data.user_id, data.disk_id, data.quantity], (err, results2) => {
                            const res = {
                                user_id: data.user_id, 
                                disk_id: data.disk_id, 
                                quantity: data.quantity
                            }
        
                            
                            this.dbConn.query(sql3, [ results[0].stock - data.quantity, data.disk_id,], (err, results3) => {
                               if(err) {
                                   reject(err)
                               }
        
                               resolve(res)
        
                            })
                            
                        })
                            
        
                        }
                        else {
                            const res = 'stock exceed!'
                            resolve(res)
                        }
                    })
                })
            }
        
            createOrder(data){
                const sql2 = 'select sum(rate * ((DATEDIFF((orders.created_at), (order_products.created_at)) + 1))) as data from order_products join disks on order_products.disk_id = disks.id join orders on order_products.user_id = orders.user_id where order_products.user_id = ?'
                const sql = 'INSERT INTO ORDERS (user_id, total_price) VALUES (?, ?)'
               
               
               
                return new Promise((resolve, reject) => {
                this.dbConn.query(sql2, [data.user_id], (err, results2 ) => {
                    console.log(results2[0].data)
                    this.dbConn.query(sql, [data.user_id, results2[0].data], (err, results) => {
                        if (err) {
                            reject(err)
                        }
                        const res = {
                            id: results.insertId,
                            ...data,
                        }
                        resolve(res)
                    })
        
                })
                   
                })
            }
        
   
}

module.exports = OrderService

// select sum(rate * ((DATEDIFF((orders.created_at), (order_products.created_at)) + 1))) from order_products join disks on order_products.disk_id = disks.id join orders on order_products.user_id = orders.user_id where orders.user_id = 1