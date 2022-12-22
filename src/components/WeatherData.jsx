import React, { useState } from 'react';
import axios from 'axios';

function WeatherData() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const API_KEY = 'c2b1e5dfd28696987ebf50ef0057756e';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(API_URL);
    const data = response.data;

    setWeather({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      { weather.temperature && (
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind Speed: {weather.wind}</p>
        </div>
      ) }
    </div>
  );
}

export default WeatherData;