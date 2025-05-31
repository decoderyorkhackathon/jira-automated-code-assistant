// Necessary imports
import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import CityWeather from '../components/CityWeather';

// Clean up after each test
afterEach(cleanup);

// Mock data for testing
const mockData = {
  data: {
    name: 'London',
    main: {
      temp: 280.32,
      pressure: 1012,
      humidity: 81,
    },
    wind: {
      speed: 4.1,
    },
    weather: [
      {
        description: 'few clouds',
      },
    ],
  },
};

// Test suite for CityWeather component
describe('CityWeather', () => {
  it('fetches and displays data', async () => {
    axiosMock.get.mockResolvedValueOnce(mockData);

    const { getByTestId } = render(<CityWeather city="London" />);

    // Check if loading state is displayed initially
    expect(getByTestId('loading')).toHaveTextContent('Loading...');

    const resolvedSpan = await waitFor(() => getByTestId('resolved'));

    // Check if data is displayed correctly after fetching
    expect(resolvedSpan).toHaveTextContent('London');
    expect(resolvedSpan).toHaveTextContent('280.32');
    expect(resolvedSpan).toHaveTextContent('1012');
    expect(resolvedSpan).toHaveTextContent('81');
    expect(resolvedSpan).toHaveTextContent('4.1');
    expect(resolvedSpan).toHaveTextContent('few clouds');

    // Check if axios.get was called correctly
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(
      `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    );
  });

  it('handles error', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error());

    const { getByTestId } = render(<CityWeather city="London" />);

    const rejectedSpan = await waitFor(() => getByTestId('rejected'));

    // Check if error message is displayed
    expect(rejectedSpan).toHaveTextContent('Error fetching data');
  });
});
