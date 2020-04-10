const conn = require('../connection/index')
const router = require('express').Router()

router.post('/cd', (req, res) => {
    const data = req.body
    const sql = `INSERT INTO DISKS (title, category, quantity) VALUES (?, ?, ?)`
    // const sql = `select * from cd where id = ${data.cd_id}`
    // const sql2 = `insert into order_cd set ?`
    // const sql3 = `select * from order where user_id  = ${data.id} and is_checkout=${false}`
    conn.query(sql, [data.title, data.category, data.quantity], (err, results) => {
        
    })
    // conn.query(sql, (err, results) => {
    //     if(err) {
    //         return res.send(err)
    //     }

    //     if(results[0].quantity >= data.quantity) {
    //         conn.query(sql3, (err, results3) =>{
    //             if(err) {
    //                 return res.send(err)
    //             }  
    //             const order_cd = {
    //                 order_id: results3[0].id,
    //                 cd_id : data.product_id,
    //                 quantity : data.quantity,
    //             }
    //             conn.query(sql2,order_cd,(err,results2)=>{
    //                 if(err){
    //                     return res.send(err)
    //                 }
    //                 res.send(results2)
    //             })
    
    //         })
            
            
    //     } else {

    //         res.status(400).send('Transaction limit exceeded. Please try again with an amount less than ${results[0].quantity}.')
    //     }     

    // })
})

export default router