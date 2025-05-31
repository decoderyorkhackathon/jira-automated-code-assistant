// Necessary imports
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import App from '../App';

// Mocking the geolocation
global.navigator.geolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3
      }
    })))
};

// Mocking the axios for OpenWeatherMap's `current` API
jest.mock('axios');

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('detects user location and fetches weather data', async () => {
    axios.get.mockResolvedValue({
      data: {
        weather: [{
          description: 'clear sky'
        }],
        main: {
          temp: 280.32
        }
      }
    });

    const { getByTestId } = render(<App />);
    const weatherElement = getByTestId('weather');

    // Wait for the API call to complete and the state to update
    await waitFor(() => {
      expect(weatherElement).toHaveTextContent('clear sky');
      expect(weatherElement).toHaveTextContent('7.17°C');
    });
  });

  it('handles errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API call failed'));

    const { getByTestId } = render(<App />);
    const errorElement = getByTestId('error');

    // Wait for the API call to fail and the error state to update
    await waitFor(() => {
      expect(errorElement).toHaveTextContent('API call failed');
    });
  });
});
