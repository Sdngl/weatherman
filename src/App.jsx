import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import WeatherDetails from "./pages/WeatherDetails";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TemperatureProvider from "./context/TemperatureContext";
import Navbar from "./components/Navbar";

export default function App() {
  const location = useLocation(); // gives current URL path

  // Pages where we DON'T want to show Navbar
  const noNavbarPages = ["/login", "/register"];
  const showNavbar = !noNavbarPages.includes(location.pathname);

  return (
    <TemperatureProvider>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/weather/:name" element={<WeatherDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </TemperatureProvider>
  );
}
