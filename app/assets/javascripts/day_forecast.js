function DayForecast(json, location){
  this.dateTime = new Date(json.dt_txt);
  this.dayOfWeek = this.getDayOfWeek();
  this.relativeDayOfWeek = this.getRelativeDayOfWeek();
  this.location = location.name;
  this.locationId = location.id;
  this.temp = this.convertTemp(json.main.temp);
  this.humidity = json.main.humidity;
  this.weatherSimple = json.weather[0].main;
  this.weatherDetails = json.weather[0].description;
  this.cloudCover = json.clouds.all;
}

DayForecast.prototype.convertTemp = function(temp){
  return (1.8 * (temp - 273)) + 32;
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
    return "today"
  } else if ((responseDay - curDay) === 1){
    return "tomorrow"
  } else {
    return this.dateTime.getDayOfWeek();
  }
}
