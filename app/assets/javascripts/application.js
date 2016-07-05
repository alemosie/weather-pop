//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

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

function appendDays(){
  $('#plus-2 .day-header').append(getDayOfWeek(addDays(2)));
  $('#plus-3 .day-header').append(getDayOfWeek(addDays(3)));
  $('#plus-4 .day-header').append(getDayOfWeek(addDays(4)));
}

$(document).ready(function(){
  var api = new OpenWeatherAdapter("newyork");
  api.getWeatherData();
  appendDays();
});
