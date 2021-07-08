const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config({path : 'config.env'})
const port = process.env.PORT || 3000;
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//load routes
app.use('/',require('./server/routes/router'));
app.use('/',require('./server/routes/update'))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
//set view engine
app.set("view engine","ejs")


const mysqlConnection = require('./server/database/connection')




app.get('/count',(req,res)=>{
  let query = "SELECT COUNT(ID) FROM forms";
  mysqlConnection.query(query,(err,rows)=>{
    if(!err){res.json({Message:rows})
             console.log(rows)}
    else{console.log(err)}
  })
})
//get all details 
app.get('/',(req,res)=>{
let query = "SELECT * FROM forms ORDER BY ID ";
mysqlConnection.query(query,(err,rows)=>{
    if(!err){res.send(rows)}
    else{console.log(err.sqlMessage);}
  })
})

//get details of selected id
app.get('/:id',(req,res)=>{
  let query = "SELECT * FROM forms where ID = ?"
  const id = req.params.id;
  mysqlConnection.query(query,[id],(err,rows)=>{
    if(!err){res.send(rows)}
    else{console.log(err.sqlMessage);}
  })
})


//create new data
app.post('/',(req,res)=>{
  const{firstname,middlename,lastname,email,phone} = req.body
  let query = `INSERT INTO forms(firstname,middlename,lastname,email,phone)VALUES('${firstname}','${middlename}','${lastname}','${email}',${phone})`;      
 mysqlConnection.query(query,(err,rows)=>{
    if(!err){res.send(rows)}
    else{console.log(err.sqlMessage);}
  })
})

//updating data
app.put('/:id',(req,res)=>{
  const id = req.params.id;
  const{firstname,middlename,lastname,email,phone} = req.body;
   let query = `UPDATE forms   SET firstname = '${firstname}',middlename = '${middlename}',lastname='${lastname}',email='${email}',phone='${phone}' where ID = ${id} `
                mysqlConnection.query(query, id ,(err,rows)=>{
                   if(!err){res.send(rows)}
                else{console.log(err.sqlMessage);}
 })    
  })

  //patch update certain details
app.patch('/:id',(req,res)=>{
  const id = req.params.id;
  const{firstname,middlename,lastname,email,phone} = req.body;
  let query = `UPDATE forms   SET email='${email}' where ID = ${id}`
  mysqlConnection.query(query,id,(err,rows)=>{
    if(!err){res.send(rows)}
    else{console.log(err)}
  })
})
  
//delete details of selected id
app.delete('/:id',(req,res)=>{
  const id = req.params.id;
  let query = `DELETE FROM forms where ID = ${id}`
 
  mysqlConnection.query(query,[id],(err,rows)=>{
    if(!err){res.send(rows)}
    else{console.log(err.sqlMessage)}
  })
})



app.listen(port,()=>console.log(`Server is running on port localhost:${port}`));