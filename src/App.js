import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});

  // Fetch user's location via IP
  const fetchLocation = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setLocation(response.data);
    } catch (error) {
      console.error('Error fetching location data: ', error);
    }
  };

  // Fetch weather data from OpenWeatherMap's `current` API
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeather(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <div className="App">
      <h1>Auto-Location Weather Widget</h1>
      {weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <h3>{Math.round(weather.main.temp - 273.15)}°C</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
```

Please note that you need to replace `process.env.REACT_APP_OPENWEATHERMAP_API_KEY` with your actual OpenWeatherMap API key. For security reasons, it's recommended to store it in a .env file and access it using `process.env`.