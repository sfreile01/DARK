//data base 
var mysql = require('mysql');
module.exports.con = mysql.createConnection({
  host: "design.ck9qlt1qutiu.us-east-1.rds.amazonaws.com",
  user: "dark",
  password: "mr01121998",
  database: 'design'
});

//Sniffer
const dgram = require('dgram');
module.exports.server = dgram.createSocket('udp4');
require('./dgram/sniffer2');

//web server
const http = require('http'); 
const express = require('express');
const path = require('path');
module.exports.path1=path;
const app = express();
module.exports.app1= app;
let server1 = http.createServer(app);

//static files 
app.use(express.static(path.join(__dirname,"../views")));
app.use("/static",express.static('./static/'));
const Port = process.env.PORT || 80;
//public file 
app.set("public", __dirname + "/public");
app.use("/public", express.static('./public/'));
//Routes
require('./Rutas/routs');

//Listening the server
 server1.listen(Port, () => {
     console.log(`escuchando puerto ${Port}`);
 });
//To HTML





