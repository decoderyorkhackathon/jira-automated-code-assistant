import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherWidget from '../components/WeatherWidget';
import axios from 'axios';

jest.mock('axios');

describe('WeatherWidget', () => {
  // Test case for successful API call
  it('displays weather data when API call is successful', async () => {
    const mockData = {
      data: {
        main: {
          temp: 280.32,
        },
        weather: [
          {
            description: 'clear sky',
          },
        ],
        name: 'London',
      },
    };

    axios.get.mockResolvedValue(mockData);

    const { getByText } = render(<WeatherWidget />);

    // Wait for the async actions to complete
    await waitFor(() => getByText(/clear sky/i));

    expect(getByText(/clear sky/i)).toBeInTheDocument();
    expect(getByText(/London/i)).toBeInTheDocument();
    expect(getByText(/7°C/i)).toBeInTheDocument(); // Converted from Kelvin to Celsius
  });

  // Test case for failed API call
  it('displays error message when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const { getByText } = render(<WeatherWidget />);

    // Wait for the async actions to complete
    await waitFor(() => getByText(/Unable to fetch weather data/i));

    expect(getByText(/Unable to fetch weather data/i)).toBeInTheDocument();
  });
});
