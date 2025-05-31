// Import necessary libraries
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherComparisonTable from '../components/WeatherComparisonTable';

// Mock OpenWeatherMap API data
const mockData = [
  {
    city: 'New York',
    temperature: 20,
    humidity: 80,
    windSpeed: 5,
  },
  {
    city: 'Los Angeles',
    temperature: 25,
    humidity: 60,
    windSpeed: 3,
  },
  {
    city: 'Chicago',
    temperature: 15,
    humidity: 70,
    windSpeed: 4,
  },
];

describe('WeatherComparisonTable', () => {
  // Test if the component renders without crashing
  it('renders without crashing', () => {
    render(<WeatherComparisonTable data={mockData} />);
  });

  // Test if the component displays the correct number of cities
  it('displays correct number of cities', () => {
    render(<WeatherComparisonTable data={mockData} />);
    const cityElements = screen.getAllByTestId('city');
    expect(cityElements.length).toBe(mockData.length);
  });

  // Test if the component displays the correct data for each city
  mockData.forEach((cityData) => {
    it(`displays correct data for ${cityData.city}`, () => {
      render(<WeatherComparisonTable data={mockData} />);
      expect(screen.getByText(cityData.city)).toBeInTheDocument();
      expect(screen.getByText(cityData.temperature.toString())).toBeInTheDocument();
      expect(screen.getByText(cityData.humidity.toString())).toBeInTheDocument();
      expect(screen.getByText(cityData.windSpeed.toString())).toBeInTheDocument();
    });
  });

  // Test if the component handles empty data correctly
  it('handles empty data correctly', () => {
    render(<WeatherComparisonTable data={[]} />);
    const tableElement = screen.getByTestId('weather-table');
    expect(tableElement).toBeEmptyDOMElement();
  });
});
