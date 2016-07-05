function CurrentWeather(dayForecast){
  this.forecast = dayForecast;
  this.weatherImage = "";
  this.tempColor = this.getTempColor(dayForecast.temp);
}

CurrentWeather.prototype.getTempColor = function(temp){
  if (temp > 80) {
    return "#CD0805"
  }
}


CurrentWeather.prototype.formatTempAndWeather = function(){
  return '<h1 style="color:' + this.tempColor + '">' + this.forecast.temp + "&deg; + " + this.forecast.weatherDetails + "</h1>";
}

CurrentWeather.prototype.appendInfo = function(){
  return "<div>" + this.formatTempAndWeather() + "</div><br>";
}
