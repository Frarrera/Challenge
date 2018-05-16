const express = require('express');
var mysql = require('mysql');
var config = require('./config/DB');

var connection = mysql.createConnection(config);
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

connection.end();

const app = express();
var port = proccess.env.port || 4000;
console.log(port);

var server = app.listen(()=>{
    console.log('app is listening port: '+port);
});