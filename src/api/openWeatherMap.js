// Importing necessary libraries and modules
import axios from 'axios';

// OpenWeatherMap API base URL
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

// Function to fetch weather data for a single city
const getWeatherDataForCity = async (cityName, apiKey) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${cityName}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weather data for ${cityName}: ${error}`);
    throw error;
  }
};

// Function to fetch weather data for multiple cities
const getWeatherDataForCities = async (cityNames, apiKey) => {
  try {
    // Using Promise.all to fetch data for all cities simultaneously
    const weatherData = await Promise.all(cityNames.map(cityName => getWeatherDataForCity(cityName, apiKey)));
    return weatherData;
  } catch (error) {
    console.error(`Failed to fetch weather data for cities: ${error}`);
    throw error;
  }
};

// Exporting the functions
export { getWeatherDataForCity, getWeatherDataForCities };
```

Please note that you need to replace `apiKey` with your actual OpenWeatherMap API key. For security reasons, never expose your API keys or sensitive data in the code. Always use environment variables or secure vaults to store and use them.