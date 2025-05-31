// Import necessary libraries
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import WeatherWidget from '../../components/WeatherWidget';

// Mock the axios module
jest.mock('axios');

describe('OpenWeatherMap API integration', () => {
  // Test case for successful API call
  it('fetches successfully data from OpenWeatherMap API', async () => {
    const data = {
      data: {
        weather: [
          {
            description: 'clear sky',
          },
        ],
        main: {
          temp: 280.32,
        },
        name: 'London',
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    render(<WeatherWidget />);

    expect(await screen.findByText(/clear sky/i)).toBeInTheDocument();
    expect(await screen.findByText(/280.32/i)).toBeInTheDocument();
    expect(await screen.findByText(/London/i)).toBeInTheDocument();
  });

  // Test case for failed API call
  it('fetches erroneously data from OpenWeatherMap API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    render(<WeatherWidget />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
