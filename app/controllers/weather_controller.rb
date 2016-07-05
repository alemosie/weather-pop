class WeatherController < ApplicationController
  def index
  end

  def data
    render json: get_forecast("newyork")
  end

  private

  def get_forecast(location)
    forecast_for_location = WeatherDatum.order(:created_at).where(location: location).first

    if forecast_for_location == nil || forecast_for_location.created_at < (Time.now - 10.minutes)
      query_url = "http://api.openweathermap.org/data/2.5/forecast?q=#{location}&APPID=#{ENV["open_weather_key"]}"
      response = RestClient.get(query_url)
      new_forecast = WeatherDatum.create(location: location, api_response: response)
      new_forecast
    else
      forecast_for_location
    end
  end


end
