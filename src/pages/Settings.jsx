import React, { useState, useContext } from "react";
import { TemperatureContext } from "../context/TemperatureContext";
import "./Settings.css";

const cities = [
  "Kathmandu",
  "Sydney",
  "London",
  "New York",
  "Tokyo"
];

export default function Settings() {
  const { unit, toggleUnit } = useContext(TemperatureContext);
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("preferredCity") || ""
  );

  const handleSave = () => {
    if (selectedCity) {
      localStorage.setItem("preferredCity", selectedCity);
     
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Temperature Unit */}
      <div className="settings-section">
        <button className="feature-card" onClick={toggleUnit}>
          Toggle Temperature Unit (Current: {unit})
        </button>
      </div>

      {/* Preferred City Selector */}
      <div className="settings-section">
        <label htmlFor="city-select">Select Preferred City: </label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="city-select"
        >
          <option value="">-- Choose a city --</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <br />
        <button className="feature-card" onClick={handleSave}>
          Save Preferred City
        </button>
      </div>
    </div>
  );
}
