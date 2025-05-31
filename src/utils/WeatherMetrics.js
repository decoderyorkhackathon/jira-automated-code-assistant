// Importing necessary libraries and modules
import axios from 'axios';

// Constants
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data for a city
const fetchWeatherData = async (city, apiKey) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${city}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}: ${error}`);
    throw error;
  }
};

// Function to fetch weather data for multiple cities
const fetchMultiCityWeatherData = async (cities, apiKey) => {
  try {
    const weatherDataPromises = cities.map(city => fetchWeatherData(city, apiKey));
    const weatherData = await Promise.all(weatherDataPromises);
    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather data for multiple cities: ${error}`);
    throw error;
  }
};

// Function to format weather data for display in a comparison table
const formatWeatherDataForTable = (weatherData) => {
  try {
    return weatherData.map(data => ({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    }));
  } catch (error) {
    console.error(`Error formatting weather data for table: ${error}`);
    throw error;
  }
};

export {
  fetchWeatherData,
  fetchMultiCityWeatherData,
  formatWeatherDataForTable,
};
```
This code provides utility functions to fetch and format weather data from the OpenWeatherMap API. It includes error handling and follows best practices for JavaScript. The functions are exported for use in other parts of the application.