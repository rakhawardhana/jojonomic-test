const mysql = require('mysql')

const conn = mysql.createConnection(
    {
        user: 'root',
        password: 'Mysql123',
        host: 'localhost',
        database: 'jojonomic_test',
        port : 3306
    }
)

module.exports = conn
