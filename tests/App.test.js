import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/Multi-City Weather Comparison/i)).toBeInTheDocument();
  });

  test('fetches weather data from OpenWeatherMap API and displays it', async () => {
    const data = {
      data: {
        list: [
          {
            name: 'City1',
            main: {
              temp: 20,
              humidity: 30,
            },
          },
          {
            name: 'City2',
            main: {
              temp: 25,
              humidity: 35,
            },
          },
          {
            name: 'City3',
            main: {
              temp: 30,
              humidity: 40,
            },
          },
        ],
      },
    };

    axios.get.mockResolvedValue(data);

    render(<App />);

    userEvent.click(screen.getByText(/Compare Weather/i));

    const items = await screen.findAllByRole('cell');

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('City1');
    expect(items[1]).toHaveTextContent('City2');
    expect(items[2]).toHaveTextContent('City3');
  });

  test('handles server error', async () => {
    axios.get.mockRejectedValue(new Error('Server Error'));

    render(<App />);

    userEvent.click(screen.getByText(/Compare Weather/i));

    const alert = await screen.findByRole('alert');

    expect(alert).toHaveTextContent(/something went wrong/i);
  });
});
