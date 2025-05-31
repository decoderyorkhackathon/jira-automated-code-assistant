// Necessary imports
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      weatherData: null,
      error: null,
    };
  }

  // Function to get user's location
  getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        }, (error) => {
          reject(error);
        });
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  // Function to get weather data
  getWeatherData = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=YOUR_API_KEY`);
      this.setState({ weatherData: response.data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  // Lifecycle method to get location and weather data
  componentDidMount() {
    this.getLocation()
      .then((location) => {
        this.setState({ location });
        this.getWeatherData(location);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { location, weatherData, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!location || !weatherData) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Weather in your location</h1>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
}

ReactDOM.render(<WeatherWidget />, document.getElementById('root'));
```

Please replace `YOUR_API_KEY` with your actual OpenWeatherMap API key.