const express = require("express");
const router = express.Router();

const mysqlConnection = require('../database/connection')
// form page
router.get("/form", (req, res) => {
  res.render("form", { message: ""});
});

//form post page
router.post("/form", (req, res) => {
  const { fname, mname, lname, email, phone } = req.body;
  
  console.log({ body: req.body });
  //check required fields
  if (!fname || !mname || !lname || !email || !phone) {
    res.render("form", {
      fname,
      mname,
      lname,
      email,
      phone,
      message: "Please fill in all fields",
    });
  }

  else {
    let query = `INSERT INTO forms(firstname,middlename,lastname,email,phone) VALUES ("${fname}","${mname}","${lname}","${email}",${phone})`;
    console.log({ query });
    mysqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        console.log({ rows });
       // res.send(rows);
        
         res.render('form',{
          message : "Thanks Your form is Submitted" ,
        })
      } else {
        console.log(err);
        return res.render("form", {
          fname,
          mname,
          lname,
          email,
          phone,
          message: err.sqlMessage
          //message: "Incorrect Details/Duplicate entry is not allowed",
        });
        //  res.send(err)
      }
    });
  }
});

router.put('form/:id',(req,res)=>{
const id = req.params.id;
const {fname,mname,lname,email,phone} = req.body;
var query = `UPDATE forms SET fname="${fname}", mname="${mname}", lname="${lname}", email="${email}" , phone=${phone} WHERE id = ${id}`;

mysqlConnection.query(query, id , (err, rows) => {
  if (!err) {res.send(rows)}
  else{console.log(err.sqlMessage)}
})
}) 


 
module.exports = router;
