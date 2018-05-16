const express = require('express'), itemRoutes = require('./expressRoutes/itemRoutes');
var config = require('./config/DB');

var connection = mysql.createConnection(config);
connection.connect();

const app = express();
app.use(itemRoutes);
var port = proccess.env.port || 4000;
console.log(port);

var server = app.listen(()=>{
    console.log('app is listening port: '+port);
});