let coord, marcador;
var  long,lat, m, poly;
var  vector_c=[];
const tileurl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

var map = L.map('map').setView([10.920533, -74.765402], 13);

L.tileLayer(tileurl2, {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var f1 = document.getElementById("f1");
var f2 = document.getElementById("f2");
var h1 = document.getElementById("h1"); 
var h2 = document.getElementById("h2"); 
var btn = document.getElementById("consultar");
var date= new Date();
var mes = (date.getMonth()+1)*0.01
f1.value= date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
f1.max=date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
f2.value= date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
f2.max=date.getFullYear()+ "-" + mes.toString().slice(2,5) + "-" + date.getDate();
h1.value="00:00:01";
h2.value="23:59:59";
btn.addEventListener("click",()=>{
    vector_c=[];
    let f11 = new Date(f1.value).getTime();
    let f22 = new Date(f2.value).getTime();
    let t11 = h1.value.split(":");
    let t22 = h2.value.split(":");
    let h11 = t11[0]*3600000+ t11[1]*60000+t11[2]*1000;
    let h22 = t22[0]*3600000+ t22[1]*60000+t22[2]*1000;
    let t1 = h11+f11;
    let t2 = h22+f22;
    if (t2>=t1){
        let consulta ={
            f1: f1.value,f2:f2.value,h1:h1.value,h2:h2.value
        }
        console.log(consulta)
        fetch("/htrc",{
            method: 'POST',
            body:JSON.stringify(consulta),
            headers:{
            'Content-Type': 'application/json'
        }
        }).then(res =>{
            return res.json();
        }).then(datos =>{
            console.log(datos);
            vector_c=[];
            if (poly){
                map.removeLayer(poly);
            }
            if (datos.length==0){
                alert("No hay datos en este intervalo");
            }else{
                datos.map((data,i)=>{
                    vector_c[i]= {
                        lat: data.lat,
                        lon: data.lon,
                    }
                });
                poly = L.polyline(vector_c).addTo(map);
            }


        });

    } else {
        alert("La fecha final es mayor que la inicial. Por favor cambiela.")
    }
});