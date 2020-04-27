const { app1 } = require('../index');
const { path1 } = require('../index');
const { con } = require('../index');
const bodyParser = require("body-parser");
app1.use(bodyParser.urlencoded({ extended: false }));
app1.use(bodyParser.json());
app1.get('/', (reg, res) => {
    res.sendFile(path1.join(__dirname, '../public/index.html'));
    //res.sendFile("/views/website.html")
 });

 app1.get('/datos',(req,res)=>{
    if (con){   
        var sql = "SELECT * FROM dark ORDER BY id DESC limit 1";
        con.query(sql,function(err,result){
            if (err) throw err;
            sniffer=result.toString("utf8");
          
            res.json(result[0]);
            //console.log('La base de datos es: ',result);
        })
    
    }else{
        console.log("Error conection with db")
    }
 });

 app1.post("/htrc",(req,res)=>{
  console.log(req.body);
  if (con) {
      console.log("Connected!");
      var sql = "SELECT * FROM dark where TIMESTAMP(fecha,hora) BETWEEN TIMESTAMP(?,?) AND TIMESTAMP(?,?)";
      var value = [
        req.body.f1,
        req.body.h1,
        req.body.f2,
        req.body.h2
      ];
      console.log(value)
      con.query(sql, value, function(err, result) {
        if (err) throw err;
        res.json(result);
        //con.end();
      });
    } else {
      console.log("Error conection with db");
    }

});

app1.post("/htrc2",(req,res)=>{
    if (con){
        console.log("CONECTED!");
        
        var sql ="SELECT *, lat, lon, ( 6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lon) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance FROM dark HAVING distance < ? AND fecha BETWEEN ? and ? ORDER BY id;";
        var value=[
          req.body.lat1,
          req.body.lon,
          req.body.lat2,
          req.body.radio,
          req.body.f1,
          req.body.f2          
        ];
        
        con.query(sql,value, function(e,result){
          if(e) throw e;
          res.json(result);
        });
    }else{
      console.log("error with db")
    }
});
