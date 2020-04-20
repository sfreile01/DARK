let coord, marcador;
var  long,lat, m, poly,marker,circle,radius,resultados;
var  vector_c=[];
const tileurl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
var map = L.map('map').setView([10.983167, -74.802561], 15);
radius = document.getElementById("r");
btn= document.getElementById("consultar");
resultados= document.getElementById("result");
L.tileLayer(tileurl, {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
marker = L.marker([10.983167, -74.802561]).addTo(map);
circle = L.circle([10.983167, -74.802561],{radius: 100}).addTo(map);  

fetch('/datos').then(res =>{
    return res.json();
}).then(mensaje => {
    map.removeLayer(marker);
    map.removeLayer(circle);
    let lat= mensaje.lat;
    let long = mensaje.lon;
    var newlatln = new L.LatLng(lat,long);
    marker = L.marker(newlatln).addTo(map);
    map.setView(newlatln)
    circle = L.circle(newlatln,{radius: 100}).addTo(map);  
});

map.on("click",Onclickmap)
    function Onclickmap(e){
        radio=radius.value;
        //console.log(radio)
        if (radius.value.length == 0){
            radio = 100;    
        }
        marker.setLatLng(e.latlng);
        circle.setLatLng(e.latlng);
        circle.setRadius(radio);
    }
   

btn.addEventListener("click",()=>{
        radio=radius.value;
        console.log(radio)
        if (radius.value.length == 0){
            radio = 100;
            
        }
        circle.setRadius(radio);
        let latt = circle.getLatLng().lat;
        let lonn = circle.getLatLng().lng;
        let radiuss = circle.getRadius()/1000;
        consulta2={
            lat1:latt,lon:lonn,lat2:latt,radio:radiuss
        }
        console.log(consulta2)
        fetch("/htrc2",{
            method: 'POST',
            body:JSON.stringify(consulta2),
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
                        fecha: data.fecha.slice(0,10),
                        hora: data.hora
                    }
                });
                poly = L.polyline(vector_c).addTo(map);
            
            }
            resultados.innerHTML = "Fecha--Hora"+"<br>"
            for (let i = 0; i < vector_c.length;i++ ){
                
                resultados.innerHTML += vector_c[i].fecha+ "--"+vector_c[i].hora + "<br>"
            }
            


        });

    
});