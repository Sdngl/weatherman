import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import WeatherDetails from "./pages/WeatherDetails";
import Settings from "./pages/Settings";
import TemperatureProvider from "./context/TemperatureContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
    <TemperatureProvider>
      <Navbar /> {/* fixed here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/weather/:name" element={<WeatherDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </TemperatureProvider>
    </>
  );
}
