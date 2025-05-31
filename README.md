# Implement Multi-City Weather Comparison Table

This project is about developing a comparison table that allows users to view weather metrics for multiple cities simultaneously. The data is fetched from the OpenWeatherMap API.

## Features

1. **Multi-City Weather Comparison**: Users can select 3 or more cities and view their weather metrics side by side for easy comparison.
2. **Real-Time Data**: The application fetches real-time weather data from the OpenWeatherMap API.
3. **User-Friendly Interface**: The application has a clean and intuitive user interface, making it easy for users to select cities and view the comparison.

## Tech Stack

- **Language**: JavaScript
- **Framework**: React
- **Testing Framework**: Jest

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the application.

## Usage

1. On the homepage, you will see a search bar where you can enter the names of the cities you want to compare.
2. After entering the city names, click on the 'Compare' button.
3. You will be redirected to a new page where you can see the weather metrics of the selected cities side by side.

## API Documentation

The application uses the OpenWeatherMap API to fetch real-time weather data. You can find the API documentation [here](https://openweathermap.org/api).

## Testing

1. Navigate to the project directory.
2. Run `npm test` to run the tests.
3. If you want to see the coverage, run `npm test -- --coverage`.

Please note that you need to have Jest installed globally on your machine to run the tests. If you don't have it installed, you can do so by running `npm install -g jest`.