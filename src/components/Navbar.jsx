import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { TemperatureContext } from "../context/TemperatureContext";

export default function Navbar() {
  const { unit, toggleUnit } = useContext(TemperatureContext);

  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <div className="brand">
          Weather Dashboard
        </div>
      </div>

      {/* Center: Links */}
      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cities" className="nav-link">Cities</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </div>

      {/* Right: Temperature Unit */}
      <div className="navbar-right">
        <button className="unit-btn" onClick={toggleUnit}>
          {unit}°
        </button>
      </div>
    </nav>
  );
}
