// Import necessary libraries
import { getLocation, getWeatherData } from '../utils/LocationUtils';
import axios from 'axios';

// Mock axios for testing
jest.mock('axios');

describe('LocationUtils', () => {
  // Test for getLocation function
  describe('getLocation', () => {
    it('should return coordinates when navigator.geolocation is available', async () => {
      // Mock geolocation
      global.navigator.geolocation = {
        getCurrentPosition: jest.fn().mockImplementation((success) => Promise.resolve(success({
          coords: {
            latitude: 51.1,
            longitude: 45.3
          }
        })))
      };

      const location = await getLocation();
      expect(location).toEqual({ lat: 51.1, lon: 45.3 });
    });

    it('should throw an error when navigator.geolocation is not available', async () => {
      // Mock geolocation
      global.navigator.geolocation = undefined;

      await expect(getLocation()).rejects.toThrow('Geolocation is not supported by this browser.');
    });
  });

  // Test for getWeatherData function
  describe('getWeatherData', () => {
    it('should return weather data when API call is successful', async () => {
      const mockData = {
        data: {
          weather: [{
            description: 'clear sky'
          }],
          main: {
            temp: 280.32
          }
        }
      };

      axios.get.mockResolvedValue(mockData);

      const weatherData = await getWeatherData(51.1, 45.3);
      expect(weatherData).toEqual({ description: 'clear sky', temperature: 280.32 });
    });

    it('should throw an error when API call fails', async () => {
      axios.get.mockRejectedValue(new Error('API call failed'));

      await expect(getWeatherData(51.1, 45.3)).rejects.toThrow('API call failed');
    });
  });
});
