import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LocationDetector = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data from OpenWeatherMap's `current` API
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={YOUR_API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  // Function to get user's location via GPS/IP
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }, (error) => {
        console.error('Error getting location: ', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Use useEffect to call getLocation on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Use useEffect to call fetchWeather whenever location state changes
  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  // Render weather data if available, else render loading message
  return (
    <div>
      {weather ? (
        <div>
          <h2>Weather in your location</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationDetector;
```

Please replace `{YOUR_API_KEY}` with your actual OpenWeatherMap API key.