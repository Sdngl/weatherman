import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getWeather } from "../services/WeatherService";
import { TemperatureContext } from "../context/TemperatureContext";
import "./Home.css";

const cityCoordinates = {
  Kathmandu: { lat: 27.7172, lon: 85.3240 },
  Sydney: { lat: -33.8688, lon: 151.2093 },
  London: { lat: 51.5074, lon: -0.1278 },
  "New York": { lat: 40.7128, lon: -74.006 },
  Tokyo: { lat: 35.6762, lon: 139.6503 },
};

export default function Home() {
  const navigate = useNavigate();
  const { unit } = useContext(TemperatureContext);
  const preferredCity = localStorage.getItem("preferredCity") || "Kathmandu";

  const [weather, setWeather] = useState(null);

  const handleExploreCities = () => {
    navigate("/cities");
  };

  useEffect(() => {
    const { lat, lon } = cityCoordinates[preferredCity];
    getWeather(lat, lon).then(setWeather);
  }, [preferredCity]);

  if (!weather) return <p>Loading weather...</p>;

  let temp = weather.current_weather.temperature;
  if (unit === "F") temp = (temp * 9) / 5 + 32;

  return (
    <div className="home-container">
      <h1>Weather Dashboard 🌤️</h1>
      <p>Check your preferred city's current weather below:</p>

      {/* Weather Broadcast Style */}
      <div className="weather-home">
        <h2>{preferredCity} Weather</h2>
        <p>🌡️ Temperature: {temp.toFixed(1)}°{unit}</p>
        <p>🌬️ Wind: {weather.current_weather.windspeed} km/h</p>
        <p>💨 Humidity: {weather.hourly.relativehumidity_2m[0]}%</p>
      </div>

      {/* Explore Cities Button */}
      <button className="explore-cities-btn" onClick={handleExploreCities}>
        🌍 Explore Cities
      </button>
    </div>
  );
}
