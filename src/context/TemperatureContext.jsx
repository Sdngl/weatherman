import { createContext, useState, useEffect } from "react";

export const TemperatureContext = createContext();

export default function TemperatureProvider({ children }) {
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    const savedUnit = localStorage.getItem("tempUnit");
    if (savedUnit) setUnit(savedUnit);
  }, []);

  const toggleUnit = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    localStorage.setItem("tempUnit", newUnit);
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
}
