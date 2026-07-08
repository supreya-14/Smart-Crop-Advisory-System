// This file contains all logic for talking to the OpenWeatherMap API.
const axios = require("axios");

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetches current weather data for a given city name.
const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: "metric", // get temperature in Celsius
      },
    });

    const data = response.data;

    // Return a clean, simplified object instead of the huge raw response
    return {
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main, // e.g. "Rain", "Clear", "Clouds"
      description: data.weather[0].description,
      rainVolume: data.rain ? data.rain["1h"] || 0 : 0,
    };
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data. Please check the city name.");
  }
};

// Converts the weather object into a simple text summary for AI prompts.
const buildWeatherSummary = (weather) => {
  return `Temperature: ${weather.temperature}°C, Feels like: ${weather.feelsLike}°C, Humidity: ${weather.humidity}%, Wind: ${weather.windSpeed} m/s, Condition: ${weather.description}, Recent rain: ${weather.rainVolume}mm`;
};

module.exports = { getCurrentWeather, buildWeatherSummary };
