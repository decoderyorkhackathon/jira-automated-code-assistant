// Import necessary libraries
import { formatWeatherData } from '../../utils/formatWeatherData';
import { mockWeatherData } from '../mocks/mockWeatherData';

describe('formatWeatherData utility', () => {
  it('should format the weather data correctly', () => {
    const formattedData = formatWeatherData(mockWeatherData);

    // Check if the formatted data has the correct structure
    expect(formattedData).toHaveProperty('city');
    expect(formattedData).toHaveProperty('temperature');
    expect(formattedData).toHaveProperty('humidity');
    expect(formattedData).toHaveProperty('windSpeed');

    // Check if the formatted data has the correct values
    expect(formattedData.city).toBe('London');
    expect(formattedData.temperature).toBe(20);
    expect(formattedData.humidity).toBe(80);
    expect(formattedData.windSpeed).toBe(10);
  });

  it('should throw an error if the input data is not valid', () => {
    expect(() => formatWeatherData(null)).toThrow('Invalid weather data');
    expect(() => formatWeatherData({})).toThrow('Invalid weather data');
    expect(() => formatWeatherData([])).toThrow('Invalid weather data');
  });
});
