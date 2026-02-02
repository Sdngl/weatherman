import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TemperatureContext } from "../context/TemperatureContext";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const { unit, toggleUnit } = useContext(TemperatureContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Detect login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <div className="brand">Weather Dashboard</div>
      </div>

      {/* Center: Links */}
      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cities" className="nav-link">Cities</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </div>

      {/* Right: Controls */}
      <div className="navbar-right">

        {/* Temperature Toggle */}
        <button className="unit-btn" onClick={toggleUnit}>
          {unit}°
        </button>

        {/* Auth Controls */}
        {user ? (
          <>
            <span className="user-name">
              {user.displayName || user.email}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
