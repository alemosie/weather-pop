// http://api.openweathermap.org/data/2.5/weather?q=newyork&APPID=APIKEY

$(document).ready(function(){
  $('#submit').click(createQuery);
});

function createQuery(event){
  event.preventDefault();
  event.stopPropagation();

  var location = $("#location").val()
  var api = new OpenWeatherAdapter(location);
  api.getWeatherData();
}

function OpenWeatherAdapter(location) {
  this.location = this.convertLocationForURL(location);
  this.url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=APIKEY";
}

OpenWeatherAdapter.prototype.convertLocationForURL = function(location) {
  return location.replace(/\s+/g, ''); // rids location of spacing for API call URL
}

OpenWeatherAdapter.prototype.getWeatherData = function() {
  $.getJSON(this.url, function(response) {
    response.list.forEach(function(forecast){
      var day = new DayForecast(forecast, response.city)
      $('#cur-weather').append(day.weatherSimple)
    });
  });
}
