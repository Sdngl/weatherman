import { useContext } from "react";
import { TemperatureContext } from "../context/TemperatureContext";

export default function Settings() {
  const { unit, toggleUnit } = useContext(TemperatureContext);

  const saveCity = (city) => {
    localStorage.setItem("preferredCity", city);
  };

  return (
    <div>
      <h2>Settings</h2>

      <button onClick={toggleUnit}>
        Toggle Unit (Current: {unit})
      </button>

      <br /><br />

      <button onClick={() => saveCity("Kathmandu")}>
        Save Kathmandu as Preferred
      </button>
    </div>
  );
}
