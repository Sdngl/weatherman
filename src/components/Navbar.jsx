import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { auth } from "../services/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { TemperatureContext } from "../context/TemperatureContext";
import "./Navbar.css";

export default function Navbar() {
  const { unit, toggleUnit } = useContext(TemperatureContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    Cookies.remove("isLoggedIn");
    navigate("/login");
  };

  // Default avatar URL (classic "no face" placeholder)
  const defaultAvatar =
    "https://www.gravatar.com/avatar/?d=mp&s=200"; // Gravatar "mystery person" image

  return (
    <nav className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <span className="brand">Weather Dashboard</span>
      </div>

      {/* Center links */}
      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        {user && (
          <>
            <Link to="/cities" className="nav-link">Cities</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
          </>
        )}
      </div>

      {/* Right section */}
      <div className="navbar-right">
        <button className="unit-btn" onClick={toggleUnit}>{unit}°</button>

        {user ? (
          <div className="user-info">
            <img
              src={user.photoURL || defaultAvatar}
              alt="Profile"
              className="user-avatar"
            />
            <span className="user-name">{user.displayName || user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
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
