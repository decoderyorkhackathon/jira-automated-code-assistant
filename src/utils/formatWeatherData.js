// Import necessary dependencies
import axios from 'axios';

// Define the base URL for the OpenWeatherMap API
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Function to fetch and format weather data for a given city
const formatWeatherData = async (city) => {
  try {
    // Fetch weather data from the API
    const response = await axios.get(`${API_BASE_URL}?q=${city}&units=metric`);

    // Check if the response is successful
    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    // Extract necessary data from the response
    const { data } = response;
    const { main, weather, wind } = data;

    // Format the data into a more usable structure
    const formattedData = {
      city: data.name,
      temperature: main.temp,
      humidity: main.humidity,
      weather: weather[0].main,
      windSpeed: wind.speed,
    };

    // Return the formatted data
    return formattedData;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error(`Failed to format weather data for city: ${city}`, error);
    throw error;
  }
};

// Export the function for use in other parts of the application
export default formatWeatherData;
