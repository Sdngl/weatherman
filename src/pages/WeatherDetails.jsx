import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getWeather } from "../services/WeatherService";
import { TemperatureContext } from "../context/TemperatureContext";

export default function WeatherDetails() {
  const location = useLocation();
  const city = location.state;
  const [weather, setWeather] = useState(null);
  const { unit } = useContext(TemperatureContext);

  useEffect(() => {
    getWeather(city.lat, city.lon).then(setWeather);
  }, [city]);

  if (!weather) return <p>Loading...</p>;

  let temp = weather.current_weather.temperature;
  if (unit === "F") temp = (temp * 9) / 5 + 32;

  return (
    <div>
      <h2>{city.name} Weather</h2>
      <p>Temperature: {temp.toFixed(1)}°{unit}</p>
      <p>Wind: {weather.current_weather.windspeed} km/h</p>
      <p>Humidity: {weather.hourly.relativehumidity_2m[0]}%</p>
    </div>
  );
}
