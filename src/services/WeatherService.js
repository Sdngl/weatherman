import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: "relativehumidity_2m"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
};
