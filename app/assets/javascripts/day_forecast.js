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
    return this.dayOfWeek;
  }
}

//formatting

DayForecast.prototype.getTempColor = function(temp){
  if (temp > 90) {
    return "#CD0805"
  } else if (temp > 80) {
    return "#CD5405"
  } else if (temp > 70) {
    return "#CDBB05"
  } else if (temp > 60) {
    return "#3FCD05"
  } else if (temp > 50) {
    return "#05CD87"
  } else if (temp > 40) {
    return "#05CDBB"
  } else if (temp > 30) {
    return "#05B8CD"
  } else if (temp > 20) {
    return "#057ECD"
  } else {
    return "#0520CD"
  }
}


DayForecast.prototype.formatDay = function(){
  return "<h1>" + this.relativeDayOfWeek + "'s weather at " + this.time + " is:</h1>";
}

DayForecast.prototype.formatTempAndWeather = function(){
  return '<h1 style="color:' + this.tempColor + '">' + this.temp + "&deg; + " + '<span class="clouds"> ' + this.weatherDetails + "</span></h1>";
}

DayForecast.prototype.appendInfo = function(){
  if (this.relativeDayOfWeek === "Today") {
    return '<div><h2>@' + this.time + ': </h2>' + this.formatTempAndWeather() + '</div><br>';
  } else {
    return "<div>" + this.formatDay() + this.formatTempAndWeather() + "</div><br>";
  }
}
