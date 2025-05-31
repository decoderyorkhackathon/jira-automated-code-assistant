// Necessary imports
import axios from 'axios';

// OpenWeatherMap API endpoint
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

// Function to get weather data
const getWeatherData = async (latitude, longitude) => {
  try {
    // API call to OpenWeatherMap's `current` API
    const response = await axios.get(API_ENDPOINT, {
      params: {
        lat: latitude,
        lon: longitude,
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        appid: 'YOUR_API_KEY',
      },
    });

    // If the API call is successful, return the data
    if (response.status === 200) {
      return response.data;
    }

    // If the API call is not successful, throw an error
    throw new Error('Unable to fetch weather data');
  } catch (error) {
    // If there's an error, log it and rethrow it
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Export the function
export default getWeatherData;
```

Please note that you need to replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.