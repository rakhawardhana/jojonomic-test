const express = require('express')

const CdController = require('./controllers/cd_controller')
const UserController = require('./controllers/user_controller')
const OrderController = require('./controllers/order_controller')
const CdService = require('./services/cd_service')
const UserService = require('./services/user_service')
const OrderService = require('./services/order_service')


const conn = require('./connection/index')


class App {
    app
    constructor() {
        this.app = express()   
        this.app.use(express.json())  
        conn.query(`
            CREATE TABLE IF NOT EXISTS DISKS (id int NOT NULL AUTO_INCREMENT, rate BIGINT NOT NULL, title varchar(255) NOT NULL, category varchar(255), stock int DEFAULT 0, PRIMARY KEY (id));
        `)
        conn.query(`
            CREATE TABLE IF NOT EXISTS CUSTOMERS (id int NOT NULL AUTO_INCREMENT, name varchar(255), PRIMARY KEY (id));
        `)
        conn.query(`
            CREATE TABLE IF NOT EXISTS ORDER_PRODUCTS (user_id int NOT NULL, disk_id int NOT NULL, quantity int NOT NULL, created_at timestamp NULL default current_timestamp, updated_at timestamp null default current_timestamp on update current_timestamp, FOREIGN KEY (user_id) REFERENCES CUSTOMERS(id) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (disk_id) REFERENCES DISKS(id) ON UPDATE CASCADE ON DELETE CASCADE);
        `)
        conn.query(`CREATE TABLE IF NOT EXISTS ORDERS (id int NOT NULL AUTO_INCREMENT, user_id int NOT NULL, total_price int DEFAULT 0,  created_at timestamp NULL default current_timestamp, updated_at timestamp null default current_timestamp on update current_timestamp,PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES CUSTOMERS(id) ON UPDATE CASCADE ON DELETE CASCADE)`)
       
    }

    registerRouters() {
        const cdService = new CdService(conn)
        const userService = new UserService(conn)
        const orderService = new OrderService(conn)
        const cdController = new CdController(cdService)
        const userController = new UserController(userService)
        const orderController = new OrderController(orderService)


        this.app.post("/disks", cdController.create)
        this.app.put("/disks/:id", cdController.updateStock)
        this.app.post("/users", userController.create)
        this.app.post("/order_products", orderController.create)
        this.app.post("/order", orderController.createOrder)
    }

    start() {
        this.registerRouters()
        this.app.listen(3000, () => {
            console.log("Running...")
        })
    }
}

new App().start()
