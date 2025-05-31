// Import necessary libraries
import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LocationDetector from '../components/LocationDetector';

// Clean up after each test
afterEach(cleanup);

// Mock the navigator.geolocation object
global.navigator.geolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3
      }
    })))
};

// Test suite for LocationDetector component
describe('LocationDetector', () => {
  test('renders without crashing', () => {
    render(<LocationDetector />);
  });

  test('calls geolocation API on mount', async () => {
    render(<LocationDetector />);
    await waitFor(() => expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled());
  });

  test('displays error message when geolocation is not available', async () => {
    // Override the geolocation mock to simulate an error
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success, failure) => Promise.resolve(failure('Geolocation is not supported by this browser.')))
    };

    const { getByText } = render(<LocationDetector />);
    await waitFor(() => expect(getByText('Geolocation is not supported by this browser.')).toBeInTheDocument());
  });
});
