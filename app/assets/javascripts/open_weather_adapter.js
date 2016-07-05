function OpenWeatherAdapter(location) {
  this.location = location;
  this.url = "/data"
}

OpenWeatherAdapter.prototype.getWeatherData = function() {
  $.getJSON(this.url, function(response) {
    var response_json = JSON.parse(response.api_response)
    response_json.list.forEach(function(forecast){
      var day = new DayForecast(forecast, response_json.city)
      if (day.relativeDayOfWeek === "Today"){
        $('#current-weather').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === "Tomorrow") {
        $('#tomorrow').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 2) {
        $('#plus-2').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 3) {
        $('#plus-3').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 4) {
        $('#plus-4').append(day.appendInfo());
      }
    });
  });
}
