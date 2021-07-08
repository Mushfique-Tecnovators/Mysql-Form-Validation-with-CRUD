const express = require('express');
const router = express.Router();
const mysql = require('mysql')

router.get('/update',(reqr,res)=>{
    res.render("update")
})

router.put('/update/:ID',(req,res)=>{
    const ID = req.params.id;
    const {fname,mname,lname,email,phone} = req.body;
    var query = `UPDATE forms SET fname="${fname}", mname="${mname}", lname="${lname}", email="${email}" , phone=${phone} WHERE id = ${id}`;
    mysqlConnection.query(query, id , (err, rows) => {
        if (!err) {res.send(rows)}
        else{console.log(err.sqlMessage)}
      })
      })
      



module.exports = router;