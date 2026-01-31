import { createContext, useEffect, useState } from "react";

export const TemperatureContext = createContext();

export default function TemperatureProvider({ children }) {

  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem("tempUnit");
    return savedUnit ? savedUnit : "C";
  });

  const toggleUnit = () => {
    setUnit(prev => (prev === "C" ? "F" : "C"));
  };

  useEffect(() => {
    localStorage.setItem("tempUnit", unit);
  }, [unit]);

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
}
export { TemperatureProvider };