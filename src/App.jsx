import { Routes, Route } from "react-router-dom";
import TemperatureProvider from "./context/TemperatureContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cities from "./pages/Cities";
import WeatherDetails from "./pages/WeatherDetails";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <TemperatureProvider>
      <Navbar />

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
