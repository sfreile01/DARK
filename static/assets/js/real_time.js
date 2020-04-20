let coord, marcador;
var  long,lat, m;
const tileurl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

var map = L.map('map').setView([51.505, -0.09], 20);

L.tileLayer(tileurl, {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
marcador = L.marker([0,0]);
marcador.addTo(map);
var polyline;
function actual_data (){
    fetch('/datos').then(res => {
        return res.json()
     }).then(mensaje => {
            m=mensaje;
            console.log(m) 
            var  long,lat, date,hora;

            lat=m.lat;
            long=m.lon;
            date=(m.fecha).slice(0,10);
            console.log('la fecha es: ',date);
            hora=m.hora;
            
            

            var variable = [lat, long,date,hora];
            //map 
            let Newlatlong = new L.LatLng(lat,long);
            marcador.setLatLng(Newlatlong);
            marcador.bindPopup(`${variable}`);
            map.setView(Newlatlong)
            //polyline
            if (!polyline) {
            polyline = L.polyline([{ lat: lat, lon: long }]).addTo(map);
            }
            polyline.addLatLng(Newlatlong);


    });

}   
let actualizar = setInterval(actual_data, 200)