// Import necessary libraries
import axios from 'axios';
import { getWeatherData } from '../../api/OpenWeatherMap';

jest.mock('axios');

describe('OpenWeatherMap API', () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    axios.get.mockClear();
  });

  it('fetches weather data successfully from OpenWeatherMap API', async () => {
    const data = {
      data: {
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        main: {
          temp: 282.55,
          feels_like: 281.86,
          temp_min: 280.37,
          temp_max: 284.26,
        },
      },
    };

    axios.get.mockResolvedValue(data);

    await expect(getWeatherData('London')).resolves.toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(
      `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    );
  });

  it('fetches erroneous response from OpenWeatherMap API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(getWeatherData('London')).rejects.toThrow(errorMessage);
  });
});
