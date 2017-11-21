/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

/*Comienzo de petición AJAX*/

//Declaración de variables

var $colContenido = $('.colContenido')
var $boton = $('#mostrarTodos');
var ciudades = ["New York", "Houston", "Miami", "Orlando", "Los Angeles", "Washington"];
var tipos = ["Casa", "Casa de Campo", "Apartamento"];

$(document).ready(function(){
  for(var i = 0; i < ciudades.length; i++){
    $('#selectCiudad').append('<option>' + ciudades[i] + '</option>');
  }
  for(var i = 0; i < tipos.length; i++){
    $('#selectTipo').append('<option>' + tipos[i] + '</option>')
  }
  $('select').material_select();


  //Formulario izquierda
  $('#formulario').submit(function(event){
    event.preventDefault();

    var ciudad = $('#selectCiudad').val();
    var tipo = $('#selectTipo').val();
    var precio = $('#rangoPrecio').val();

    $.ajax({
      url: './buscador.php',
      type: 'POST',
      data: {ciudad: ciudad, tipo: tipo},
      success: function(data){
        var opcionCiudad = data.c;
        var opcionTipo =  data.t;
        $.getJSON('http://localhost/Buscador/data-1.json', function(json){
          $colContenido.empty();
          for(var i = 0; i < json.length; i++){
            //Filtro de ciudad
            if(json[i].Tipo == opcionTipo && json[i].Ciudad == opcionCiudad){
              $colContenido.append('<div style="padding: 15px; margin: 15px; background-color: #CCC"> <img src="img/home.jpg" style="width:20%"/><p> Ciudad: ' + json[i].Ciudad + '. Tipo: ' + json[i].Tipo + '. Direccion: ' + json[i].Direccion + '. Telefono: ' + json[i].Telefono + '</p></div>');
            }
          }
          for(var i = 0; i < json.length; i++){
            //Filtro de ciudad
            if(json[i].Ciudad == opcionCiudad){
              $colContenido.append('<div style="padding: 15px; margin: 15px; background-color: #CCC"> <img src="img/home.jpg" style="width:20%"/><p> Ciudad: ' + json[i].Ciudad + '. Tipo: ' + json[i].Tipo + '. Direccion: ' + json[i].Direccion + '. Telefono: ' + json[i].Telefono + '</p></div>');
            }

          }
          for(var i = 0; i < json.length; i++){
            //Filtro de ciudad
            if(json[i].Tipo == opcionTipo){
              $colContenido.append('<div style="padding: 15px; margin: 15px; background-color: #CCC"> <img src="img/home.jpg" style="width:20%"/><p> Ciudad: ' + json[i].Ciudad + '. Tipo: ' + json[i].Tipo + '. Direccion: ' + json[i].Direccion + '. Telefono: ' + json[i].Telefono + '</p></div>');
            }
          }
        })
      }
    })


  })


  $boton.click(function(){
    
      $.ajax({
        url: 'http://localhost/Buscador/data-1.json',
        type: 'GET',
        dataType: 'json',
        success: function(data){
          $colContenido.after().empty();
          for (var i = 0; i < data.length; i++){
            $colContenido.append('<div style="margin: 15px; background-color: #CCC; padding: 15px"> <img src="img/home.jpg" style="width:20%"> <p> Ciudad: ' + data[i].Ciudad + '. Tipo de Inmueble: ' + data[i].Tipo + '. Direccion: ' + data[i].Direccion + '. Telefono: ' + data[i].Telefono + '. Precio: ' + data.Precio + '</p></div>')
          }


        }
      })
  })
  
})
