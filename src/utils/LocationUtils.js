// Import necessary libraries
import axios from 'axios';

// Constants
const OPEN_WEATHER_MAP_API = 'https://api.openweathermap.org/data/2.5/weather';

// Function to get user's location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

// Function to get weather data
export const getWeatherData = async (latitude, longitude, apiKey) => {
  try {
    const response = await axios.get(`${OPEN_WEATHER_MAP_API}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data.');
  }
};
