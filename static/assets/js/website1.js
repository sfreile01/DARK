        var socket =io();
        let coord, marcador;
        var  long,lat, m;
        const tileurl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png';
        const tileurl2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
        
        var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer(tileurl2, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            marcador = L.marker([0,0]);
            marcador.addTo(map);
            var polyline;
            function actual_data (){
                socket.emit('mapa',"hola");
                socket.on('enviarCoordenada',function(mensaje){
                console.log(mensaje[0]) 
                var  long,lat, date;
                
                lat=mensaje[0].lat;
                long=mensaje[0].lon;
                date=mensaje[0].fecha;

                //console.log(typeof mensaje[0])
                
                var coord2=document.getElementById("lat");
                var coord3=document.getElementById("long");
                var coord4=document.getElementById("fecha");
                
                //console.log('Usuarios conectados: ',mensaje1)

                
                //coord1.innerText=mensaje;
                coord2.innerText=lat;
                coord3.innerText=long;
                coord4.innerText=date;
                var variable = [lat, long,date];
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
                
                socket.on('usuarios',function(mensaje){
                    var numero=document.getElementById("num");
                    numero.innerHTML=mensaje;
                });
                
        }   
    let actualizar = setInterval(actual_data, 200)

    