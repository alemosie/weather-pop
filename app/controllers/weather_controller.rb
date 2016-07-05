class WeatherController < ApplicationController
  def index
  end

  def data
    # send json response back from database or API, depending on time of last request
    render json: get_forecast("newyork")
  end

  private

  # in response to Open Weather API rate limit of one call per 10 min
  # solution: store response in DB. If fresh response (i.e. less than 10-min ago) in DB, serve DB version.
    # otherwise, call API again

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
