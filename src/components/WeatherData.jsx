import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  Switch,
} from '@mui/material';
import '../WeatherData.css'

const WeatherData = () => {
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract the latitude and longitude from the geolocation data
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

        // Fetch the weather data from the OpenWeatherMap API
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=c2b1e5dfd28696987ebf50ef0057756e`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Extract the temperature and weather data from the API response and store it in the component's state
            setTemperature(data.main.temp);
            setWeather({
              icon: data.weather[0].icon,
              description: data.weather[0].description,
              city: data.name,
              country: data.sys.country,
            });
          })
          .catch((error) => {
            console.error(error);
            // If there was an error fetching the data, store it in the component's state
            setError(error);
          });
      },
      (error) => {
        console.error(error);
        // If there was an error getting the user's location, store it in the component's state
        setError(error);
      }
    );
  }, [units]);

  const handleUnitsChange = (event) => {
    setUnits(event.target.checked ? 'imperial' : 'metric');
  };

  return (
    <Card className="WeatherData-card">
      <CardContent>
        {error ? (
          // If there was an error, display an error message
          <Typography variant="h5" component="h2" color="error">
            Error: {error.message}
          </Typography>
        ) : weather ? (
          // If the weather data was successfully fetched, display it
          <>
            <Typography variant="h5" component="h2" className="WeatherData-location">
              {weather.city}, {weather.country}
            </Typography>
            <CardMedia
              component="img"
              alt={weather.description}
              className="WeatherData-icon"
              image={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              title={weather.description}
            />
            <Typography variant="h5" component="h2" className="WeatherData-description">
              {weather.description}
            </Typography>
            <Typography variant="h5" component="h2" className="WeatherData-temp">
              Temperature: {temperature} °{units === 'metric' ? 'C' : 'F'}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={units === 'imperial'}
                  onChange={handleUnitsChange}
                  name="units"
                  color="primary"
                />
              }
              label={units === 'metric' ? 'Show Fahrenheit' : 'Show Celsius'}
              />
            </>
          ) : (
            // If the data is still being fetched, display a loading message
            <Typography variant="h5" component="h2">
              Loading...
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };
  
  export default WeatherData;  