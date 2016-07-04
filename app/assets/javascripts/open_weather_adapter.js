// http://api.openweathermap.org/data/2.5/weather?q=newyork&APPID=APIKEY

$(document).ready(function(){
  $('#submit').click(createQuery);
});

function createQuery(event){
  event.preventDefault();
  event.stopPropagation();

  var location = $("#location").val()
  var api = new OpenWeatherAdapter(location);

  $("#location").empty();
  alert(location);
  // api.getWeatherData();
}

function OpenWeatherAdapter(location) {
  this.location = location;
  this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=APIKEY";
}

function getWeatherData() {
  $.getJSON(this.url, function(response) {
    var weather = response.weather[0].description
  }).appendTo("#cur-weather");
}
