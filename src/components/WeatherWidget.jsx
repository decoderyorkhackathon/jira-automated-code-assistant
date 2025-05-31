import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Function to get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to get weather data
  const getWeatherData = async () => {
    if (location) {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid={YOUR_API_KEY}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    }
  };

  // Get location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Get weather data when location changes
  useEffect(() => {
    getWeatherData();
  }, [location]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <h3>{weatherData.weather[0].main}</h3>
          <p>{weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
```

Please replace `{YOUR_API_KEY}` with your actual OpenWeatherMap API key.