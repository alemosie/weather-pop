function DayForecast(json, location){
  this.dateTime = this.convertForecastDateTime(json.dt_txt);
  this.time = this.getForecastTime();
  this.dayOfWeek = this.getDayOfWeek();
  this.relativeDayOfWeek = this.getRelativeDayOfWeek();
  this.location = location.name;
  this.locationId = location.id;
  this.temp = this.convertTemp(json.main.temp);
  this.humidity = json.main.humidity;
  this.weatherSimple = json.weather[0].main;
  this.weatherDetails = json.weather[0].description;
  this.cloudCover = json.clouds.all;

  // formatting
  this.weatherImage = "";
  this.tempColor = this.getTempColor(this.temp);
}

DayForecast.prototype.convertForecastDateTime = function(respDT){
  var dateTime = new Date(respDT);
  var now = new Date();
  // get the hours' difference between UDT and local time, since Javascript date parsing automatically converts string to local time.
  var hoursDifferential = now.getTimezoneOffset() / 60
  dateTime.setHours(dateTime.getHours() - hoursDifferential);
  return dateTime;
}

DayForecast.prototype.getForecastTime = function(){
  var timeOfDay = "AM";
  var hours = this.dateTime.getHours();
  if (this.dateTime.getHours() >= 12){
    timeOfDay = "PM";
    hours = this.dateTime.getHours() - 12;
  }
  return hours + ":00 " + timeOfDay;
}

DayForecast.prototype.convertTemp = function(temp){
  return Math.round((1.8 * (temp - 273)) + 32);
}

DayForecast.prototype.getDayOfWeek = function(){
  switch (this.dateTime.getDay()) {
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

//formatting

DayForecast.prototype.getTempColor = function(temp){
  if (temp > 90) {
    return "#CD0805"
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
    return "#0520CD"
  }
}

DayForecast.prototype.formatCurrentTempAndWeather = function(){
  return '<h1 style="color:' + this.tempColor + '">' + this.getWeatherIcon() + " " + this.temp + "&deg;" + '<span id="weather">+ ' + this.weatherDetails + "</span></h1>";
}

DayForecast.prototype.formatFutureTempAndWeather = function(){
  return '<span style="color:' + this.tempColor + '">' + this.temp + "&deg;<br>" + this.getWeatherIcon() + "</span>"
}

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

DayForecast.prototype.appendInfo = function(){
  if (this.relativeDayOfWeek === "Today") {
    return '<div><span id="current-time">' + this.time + "</span>" + this.formatCurrentTempAndWeather() + '</div><br>';
  } else {
    return '<div class="day-box"><div class="future-time">' + this.time + '</div>' + this.formatFutureTempAndWeather() + '</div>'
  }
}
