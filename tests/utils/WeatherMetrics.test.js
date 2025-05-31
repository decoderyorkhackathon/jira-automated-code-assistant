// Import necessary libraries
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getWeatherMetrics } from '../../utils/WeatherMetrics';

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock successful API response
mock.onGet('http://api.openweathermap.org/data/2.5/weather').reply(200, {
  main: {
    temp: 280.32,
    feels_like: 278.13,
    temp_min: 279.15,
    temp_max: 281.15,
    pressure: 1012,
    humidity: 76,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 320,
  },
  clouds: {
    all: 90,
  },
  dt: 1485789600,
  sys: {
    type: 1,
    id: 5091,
    country: 'GB',
    sunrise: 1485762037,
    sunset: 1485794875,
  },
  id: 2643743,
  name: 'London',
  cod: 200,
});

describe('WeatherMetrics utility functions', () => {
  it('fetches weather data successfully from OpenWeatherMap API', async () => {
    const data = await getWeatherMetrics('London');
    expect(data).toBeDefined();
    expect(data.main.temp).toEqual(280.32);
    expect(data.name).toEqual('London');
  });

  it('handles error properly when API call fails', async () => {
    mock.onGet('http://api.openweathermap.org/data/2.5/weather').reply(500);
    await expect(getWeatherMetrics('London')).rejects.toThrow('Request failed with status code 500');
  });
});
