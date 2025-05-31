import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherTable from './components/WeatherTable';

const App = () => {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityNames = ['London', 'New York', 'Tokyo']; // Add more city names as required
        const weatherDataPromises = cityNames.map(city => 
          axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid={YOUR_API_KEY}`)
        );
        const weatherDataResponses = await Promise.all(weatherDataPromises);
        const weatherData = weatherDataResponses.map(response => response.data);
        setCities(weatherData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Multi-City Weather Comparison</h1>
      <WeatherTable cities={cities} />
    </div>
  );
};

export default App;
```

Please replace `{YOUR_API_KEY}` with your actual OpenWeatherMap API key. Also, make sure to create a `WeatherTable` component in `./components/WeatherTable` that accepts `cities` as a prop and displays the weather data in a table format.