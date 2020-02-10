const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proapi'
})

mysqlConnection.connect(function (err){
   (err) ? console.log(err): console.log('db connected');
   }   
);

module.exports = mysqlConnection;