import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Weather Dashboard</h1>
      <p>Check live weather of cities</p>
      <Link to="/cities">View Cities</Link>
    </div>
  );
}
