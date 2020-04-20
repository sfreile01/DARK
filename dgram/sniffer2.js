const { server } = require('../index');
const { con } = require('../index');
var mensaje;
var PUERTO = 5003;
var DIRECCION="172.31.34.241;
var longitud, latitud, fech,Hora,Fecha;
server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });
  server.on('message', (msg, rinfo) => {
     mensaje = msg.toString('utf8');
     var re = /,/gi;
     mensaje = mensaje.replace(re,'.');
    fecha=mensaje.slice(4,17)
    id=mensaje.slice(38,42);
    latitud = mensaje.slice(17,25);
    longitud = mensaje.slice(25,34);
  
    fech = new Date(parseFloat(fecha)-18000000);
    Fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
    Hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
    console.log('El mensaje es: ',mensaje);
    if(con){

      var sql = "INSERT INTO dark (fecha,hora,lat,lon) VALUES ? ";
      var values =[[Fecha,Hora,latitud,longitud]];
      con.query(sql,[values],function(err,result){
        if (err)throw err;
        console.log("data insert");
        
      });
    
    }else{
      console.log("Error connection with db")
    }
  });
  server.bind(PUERTO, DIRECCION);
