function OpenWeatherAdapter(location) {
  this.location = location;
  this.url = "http://localhost:3000/data"
  // this.key = $('#key').val();
  // this.url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&APPID=" + this.key;
}

// OpenWeatherAdapter.prototype.convertLocationForURL = function(location) {
//   rids location of spacing for API call URL
//   return location.replace(/\s+/g, '');
// }

OpenWeatherAdapter.prototype.getWeatherData = function() {
  $.getJSON(this.url, function(response) {
    var response_json = JSON.parse(response.api_response)
    response_json.list.forEach(function(forecast){
      var day = new DayForecast(forecast, response_json.city)
      if (day.relativeDayOfWeek === "Today"){
        $('#current-weather').append(day.appendInfo());
        // $('#current-weather').append(day.currentWeatherDetails());
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

    $('#plus-2 .day-header').append(getDayOfWeek(addDays(2)));
    $('#plus-3 .day-header').append(getDayOfWeek(addDays(3)));
    $('#plus-4 .day-header').append(getDayOfWeek(addDays(4)));

}
