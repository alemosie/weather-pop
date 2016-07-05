class CreateWeatherData < ActiveRecord::Migration
  def change
    create_table :weather_data do |t|
      t.string :location
      t.string :api_response
      t.timestamps
    end
  end
end
