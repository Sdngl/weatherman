import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cities.css";

const cities = [
  { name: "Kathmandu", lat: 27.7, lon: 85.3 },
  { name: "Sydney", lat: -33.8, lon: 151.2 },
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "New York", lat: 40.7, lon: -74.0 },
 { name: "Tokyo", lat: 35.6, lon: 139.7 },
];

export default function Cities() {
  const navigate = useNavigate();
  const [savedCities, setSavedCities] = useState(() => {
    const saved = localStorage.getItem("preferredCities");
    return saved ? JSON.parse(saved) : [];
  });

  const handleView = (city) => {
    console.log("Viewing city:", city);
    navigate(`/weather/${city.name}`, { state: city });
  };

  const handleSave = (city) => {
    if (!savedCities.find((c) => c.name === city.name)) {
      const updated = [...savedCities, city];
      setSavedCities(updated);
      localStorage.setItem("preferredCities", JSON.stringify(updated));
      console.log("Saved city:", city);
    } else {
      console.log(city.name, "is already saved");
    }
  };

  return (
    <div className="cities-container">
      <h2>Select City</h2>
      <div className="cities-list">
        {cities.map((city) => (
          <div key={city.name} className="city-card">
            <h3>{city.name}</h3>
            <div className="city-buttons">
              <button onClick={() => handleView(city)} className="btn view-btn">
                View Details
              </button>
              <button onClick={() => handleSave(city)} className="btn save-btn">
                Save Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
