const mysql = require('mysql');
//mysql connection
const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'mydatabase',
    multipleStatements : true 
  });
  mysqlConnection.connect((err)=>{
      if(!err){console.log("connected"); }
      else{ console.log(err)}
  });

  module.exports = mysqlConnection