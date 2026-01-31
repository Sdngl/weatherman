import { Link } from "react-router-dom";

const cities = [
  { name: "Kathmandu", lat: 27.7, lon: 85.3 },
  { name: "Sydney", lat: -33.8, lon: 151.2 },
  { name: "London", lat: 51.5, lon: -0.1 }
];

export default function Cities() {
  return (
    <div>
      <h2>Select City</h2>
      {cities.map((city) => (
        <div key={city.name}>
          <Link
            to={`/weather/${city.name}`}
            state={city}
            onClick={() => console.log("Selected City:", city)}
          >
            {city.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
