$(document).ready(function(){
  event.preventDefault();
  event.stopPropagation();

  // var location = $("#location").val()
  // set default location

  var api = new OpenWeatherAdapter("newyork");
  api.getWeatherData();
});

function addDays(days) {
  var now = new Date();
  now.setDate(now.getDate() + days);
  return now;
}

function getDayOfWeek(date){
  switch (date.getDay()) {
    case 0:
        return "Sunday";
        break;
    case 1:
        return "Monday";
        break;
    case 2:
        return "Tuesday";
        break;
    case 3:
        return "Wednesday";
        break;
    case 4:
        return "Thursday";
        break;
    case 5:
        return "Friday";
        break;
    case 6:
        return "Saturday";
  }
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
        // $('#current-weather').append(day.currentWeatherDetails());
      } else if (day.relativeDayOfWeek === "Tomorrow") {
        $('#tomorrow').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 2) {
        $('#plus-2').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 3) {
        $('#plus-3').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 4) {
        $('#plus-4').append(day.appendInfo());
      } else if (day.relativeDayOfWeek === 5) {
        $('#plus-5').append(day.appendInfo());
      }
    });
    $('#plus-2 .day-header').append(getDayOfWeek(addDays(2)));
    $('#plus-3 .day-header').append(getDayOfWeek(addDays(3)));
    $('#plus-4 .day-header').append(getDayOfWeek(addDays(4)));
    $('#plus-5 .day-header').append(getDayOfWeek(addDays(5)));

  });
}
