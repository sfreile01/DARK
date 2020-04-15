//sniffer
const { server } = require('../index');
const { con } = require('../index');

var mensaje;
var longitud, latitud, fecha, hora, d;
var mensaje_t;

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  //Mensaje
  mensaje = msg.toString("utf8");
  var f = mensaje.slice(6,11);
    //Hour and date
    const janTimeMilli = new Date("January 5, 1980 19:00:00").getTime();
    const numWeeks = parseInt(mensaje.substring(6, 10));
    const numSeconds = parseInt(mensaje.substring(11, 16));
    const numWeeksMilli = numWeeks * 7 * 24 * 60 * 60 * 1000;
    const dateWeek = parseInt(mensaje.substring(10, 11)) * 24 * 60 * 60 * 1000;
    const time = numSeconds * 1000 + numWeeksMilli + janTimeMilli + dateWeek;
    const time1 = new Date(time).toString();
  
  console.log(`la fecha es ${time1}`)

  //Coordinates
  latitudap = mensaje.slice(16,19);
  latituddp = mensaje.slice(19,24);
  latitud = latitudap + "." + latituddp;
  
  longitudap1 = mensaje[24];
  longitudap2 = mensaje.slice(26,28);
  longituddp = mensaje.slice(28,33);
  longitud = longitudap1 + longitudap2 + "." + longituddp;
  //const hora = new Date()  
  //const secondsSinceEpoch = Math.round(hora.getTime() / 1000)  
  mensaje_t=[
      latitud,longitud, time1
  ]
  console.log(`El mensaje es: ${mensaje}`);
  console.log(`la hora es : ${hora}`);
  console.log(`la latitud es : ${latitud}`);
  console.log(`La longitud es: ${longitud}`);
  // insert db
if(con){
  
  var sql = "INSERT INTO dark (fecha, lat,lon) VALUES ? ";
  var values =[[time1,latitud,longitud]];
  con.query(sql,[values],function(err,result){
    if (err)throw err;
    console.log("data insert");
    
  });

}else{
  console.log("Error connection with db")
}
  


});

server.bind(5003, "172.31.83.234");