function DayForecast(json, location){
  this.dateTime = this.convertForecastDateTime(json.dt_txt);
  this.time = this.getForecastTime();
  this.relativeDayOfWeek = this.getRelativeDayOfWeek();
  this.temp = this.convertTemp(json.main.temp);
  this.humidity = json.main.humidity;
  this.cloudCover = json.clouds.all;
  this.weatherSimple = json.weather[0].main;
  this.weatherDetails = json.weather[0].description;
  this.tempColor = this.getTempColor(this.temp);
  this.id = this.relativeDayOfWeek + this.time.split(":")[0];
}

//////----- DATA MANIPULATION -----//////

// associate Date/Time object with forecast
DayForecast.prototype.convertForecastDateTime = function(respDT){
  var formattedDate = respDT.replace(/-/g, "/") // for Safari compatibility
  var dateTime = new Date(formattedDate);
  var now = new Date();
  // get the hours' difference between UDT and local time, since Javascript date parsing automatically converts string to local time.
  var hoursDifferential = now.getTimezoneOffset() / 60
  dateTime.setHours(dateTime.getHours() - hoursDifferential);
  return dateTime;
}

// extract time from forecast date/time
DayForecast.prototype.getForecastTime = function(){
  var timeOfDay = "AM";
  var hours = this.dateTime.getHours();
  if (this.dateTime.getHours() >= 12){
    timeOfDay = "PM";
    hours = this.dateTime.getHours() - 12;
  }
  return hours + ":00 " + timeOfDay;
}

// convert temperature from kelvin to fahrenheit
DayForecast.prototype.convertTemp = function(temp){
  return Math.round((1.8 * (temp - 273)) + 32);
}

// find how far away from today forecast day is
DayForecast.prototype.getRelativeDayOfWeek = function(){
  var curDate = new Date();
  var curDay = curDate.getDay();
  var responseDay = this.dateTime.getDay();
  if (curDay === responseDay){
    return "Today"
  } else if ((responseDay - curDay) === 1){
    return "Tomorrow"
  } else {
    return responseDay - curDay;
  }
}

//////----- FORMATTING -----//////

// get color associated with temperature
DayForecast.prototype.getTempColor = function(temp){
  if (temp >= 90) {
    return "#CD0805" // red
  } else if (temp >= 80) {
    return "#CD5405"
  } else if (temp >= 70) {
    return "#CDBB05"
  } else if (temp >= 60) {
    return "#3FCD05"
  } else if (temp >= 50) {
    return "#05CD87"
  } else if (temp >= 40) {
    return "#05CDBB"
  } else if (temp >= 30) {
    return "#05B8CD"
  } else if (temp >= 20) {
    return "#057ECD"
  } else {
    return "#0520CD" // blue
  }
}

//:: Current Weather
// create text/styling for today's weather

DayForecast.prototype.formatCurrentTempAndWeather = function(){
  var text = '<span class="current-main" style="background-color:white; color:' + this.tempColor + '">' + " <b>" + this.temp + "&deg;</b>" + '<span class="current-weather-text">+ ' + this.weatherDetails + '</span></span>'
  var button = ' <button type="button" onclick=showDetails(\'' + this.id + '\') class="current-details-button"><img src="http://iconshow.me/media/images/ui/ios7-icons/png/256/plus-outline.png"></button>'
  return text + button;
}

// toggle the details for selected weather forecast
function showDetails(id){
  $("#" + id).toggle("slow");
}

DayForecast.prototype.currentWeatherDetails = function(index){
  var tableHead = '<table id=' + this.id + ' style="display:none;width:100%"><tr><th><h4>Humidity</h4></th><th><h4>Cloud coverage</h4></th></tr><tr>'
  var tableFoot = '</tr></table>'
  var hum = '<td>' + this.humidity + "%</td>";
  var clouds = '<td>' + this.cloudCover + "%</td>";
  return tableHead + hum + clouds + tableFoot;
}

//:: Future Weather

// create text/styling for forecasts tomorrow and beyond
DayForecast.prototype.formatFutureTempAndWeather = function(){
  return '<span style="color:' + this.tempColor + '">' + this.temp + "&deg;<br>" + this.getWeatherIcon() + "</span>"
}

// get weather icon associated with forecast
DayForecast.prototype.getWeatherIcon = function(){
  if (this.weatherSimple.toLowerCase().includes("cloud")){
    return '<img src="http://simpleicon.com/wp-content/uploads/cloud-10.png" height=40 width=40>'
  } else if (this.weatherSimple.toLowerCase().includes("rain")){
    return '<img src="http://downloadicons.net/sites/default/files/rain-icon-46110.png" height=40 width=40>'
  } else if (this.weatherSimple.toLowerCase().includes("snow")){
    return '<img src="https://cdn3.iconfinder.com/data/icons/glypho-weather/64/weather-snow-flake-512.png" height=40 width=40>'
  } else {
    return '<img src="http://www.freeiconspng.com/uploads/sun-icon-2.png" height=40 width=40>'
  }
}

// append text/styling for all forecasts
DayForecast.prototype.appendInfo = function(){
  if (this.relativeDayOfWeek === "Today") {
    return '<div><span class="current-time">' + this.time + "</span>" + this.formatCurrentTempAndWeather() + '<br><br>' + this.currentWeatherDetails() + '</div><br><br>';
  } else {
    return '<div class="day-box"><div class="future-time">' + this.time + '</div>' + this.formatFutureTempAndWeather() + '</div>'
  }
}
