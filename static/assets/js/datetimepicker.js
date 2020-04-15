window.onload = function(){
 
$.ajax({
    type: "GET",
    url : '../public/prueba.html',
    success: function(datos){
        $("#dtp2").html(datos);


    }
});


}

