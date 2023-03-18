import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

export function WeatherInfo() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://localhost:8080/weather`;
    const data = { lat, lon };
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await axios.post(url, data, { headers });
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Get Weather</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
        </label>
        <label>
          Longitude:
          <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
