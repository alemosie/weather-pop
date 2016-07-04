$(document).ready(function(){
  event.preventDefault();
  event.stopPropagation();

  // var location = $("#location").val()
  // set default location
  var api = new OpenWeatherAdapter("newyork");
  api.getWeatherData();
});

function createQuery(event){
  event.preventDefault();
  event.stopPropagation();

  // var location = $("#location").val()
  // set default location
  // var api = new OpenWeatherAdapter("newyork");
  // api.getWeatherData();
}

function OpenWeatherAdapter(location) {
  this.location = location;
  this.key = $('#key').val();
  this.url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=" + this.key;
}

// OpenWeatherAdapter.prototype.convertLocationForURL = function(location) {
//   rids location of spacing for API call URL
//   return location.replace(/\s+/g, '');
// }

OpenWeatherAdapter.prototype.getWeatherData = function() {
  $.getJSON(this.url, function(response) {
    response.list.forEach(function(forecast){
      var day = new DayForecast(forecast, response.city)
      if (day.relativeDayOfWeek === "Today"){
        $('#current-weather').append(day.appendInfo());
      }
    });
  });
}
