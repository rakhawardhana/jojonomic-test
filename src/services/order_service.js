class OrderService {
    dbConn

    constructor(db){
        this.dbConn = db
        
        
    }

   
}

module.exports = OrderService

// select sum(rate * ((DATEDIFF((orders.created_at), (order_products.created_at)) + 1))) from order_products join disks on order_products.disk_id = disks.id join orders on order_products.user_id = orders.user_id where orders.user_id = 1