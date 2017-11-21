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


var $colContenido = $('.colContenido')
var $boton = $('#mostrarTodos')

$(document).ready(function(){

  $('select').material_select()
  var ciudades = ["New York", "Orlando", "Los Angeles", "Houston", "Washington", "Miami"];
  var tipos = ["Casa", "Casa de Campo", "Apartamento"];

  for(var i = 0; i < ciudades.length; i++){
    $('#selectCiudad').append('<option>' + ciudades[i] + '</option>')
  }

  for(var i = 0; i < tipos.length; i++){
    $('#selectTipo').append('<option>' + tipos[i] + '</option>')
  }

  $('select').material_select()

 $('#submitButton').click(function(event){
  event.preventDefault();

    var ciudad = $('#selectCiudad').val();
    var tipo = $('#selectTipo').val();

    $.ajax({
      url: 'buscador.php',
      type: 'POST',
      data: {ciudad: ciudad, tipo: tipo},
      success: function(data){
        $.getJSON('http://localhost/Buscador/data-1.json', function(json){;
          for(var i = 0; i < json.length; i++){
            if(json[i].Ciudad == data.c){
              $colContenido.append('<div style="background-color: #CCC; margin: 10px">  <img src="img/home.jpg" style="width: 30%; margin: 10px">' + "<p style='margin-left: 10px'>" + 'Ciudad: ' + json[i].Ciudad + ". Tipo: " + json[i].Tipo + ". Direccion: " + json[i].Direccion + " Telefono: " + json[i].Telefono + ". Precio: " + json[i].Precio + "</p>" + "</div>");
            }
            else if(json[i].Tipo == data.t){
              $colContenido.append('<div style="background-color: #CCC; margin: 10px">  <img src="img/home.jpg" style="width: 30%; margin: 10px">' + "<p style='margin-left: 10px'>" + 'Tipo de Inmueble: ' + json[i].Tipo + ". Ciudad: " + json[i].Ciudad + ". Direccion: " + json[i].Direccion + " Telefono: " + json[i].Telefono + ". Precio: " + json[i].Precio + "</p>" + "</div>");
            }


            else if(json[i].Ciudad == data.c && json[i].Tipo == data.t){
              $colContenido.append('<div style="background-color: #CCC; margin: 10px">  <img src="img/home.jpg" style="width: 30%; margin: 10px">' + "<p style='margin-left: 10px'>" + 'Ciudad: ' + json[i].Ciudad + ". Tipo: " + json[i].Tipo + ". Direccion: " + json[i].Direccion + " Telefono: " + json[i].Telefono + ". Precio: " + json[i].Precio + "</p>" + "</div>");
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
        for(var i = 0; i < 100; i++){
          $colContenido.append('<div style="background-color: #CCC; margin: 10px">  <img src="img/home.jpg" style="width: 30%; margin: 10px">' + "<p style='margin-left: 10px'>" + 'Tipo de inmueble: ' + data[i].Tipo + ". Ciudad: " + data[i].Ciudad + ". Direccion: " + data[i].Direccion + " Telefono: " + data[i].Telefono + ". Precio: " + data[i].Precio + "</p>" + "</div>");

        }
      }
    })
  })


  
  
})