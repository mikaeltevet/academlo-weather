import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

const WeatherApp = () => {
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract the latitude and longitude from the geolocation data
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

        // Fetch the weather data from the OpenWeatherMap API
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c2b1e5dfd28696987ebf50ef0057756e&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Extract the temperature from the API response and store it in the component's state
            setTemperature(data.main.temp);
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
  }, []);

  return (
    <Card>
      <CardContent>
        {error ? (
          // If there was an error, display an error message
          <Typography variant="h5" component="h2" color="error">
            Error: {error.message}
          </Typography>
        ) : temperature ? (
          // If the temperature data was successfully fetched, display it
          <Typography variant="h5" component="h2">
            Temperature: {temperature}°C
          </Typography>
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

export default WeatherApp;