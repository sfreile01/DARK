var mysql = require('mysql');
var con = mysql.createConnection({
  host: "design.ck9qlt1qutiu.us-east-1.rds.amazonaws.com",
  user: "dark",
  password: "mr01121998",
  database: 'design'
});

// if (con){   
//     var sql = "SELECT id FROM dark where lat = '10,93487' and lon = '-74,76797';";
//     con.query(sql,function(err,result){
//         if (err) throw err;
//         console.log(result)
//     })

// }else{
//     console.log("Error conection with db")
// }
con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM dark WHERE lat = '0000000+'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });