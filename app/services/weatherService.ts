import axios from 'axios';

export const fetchWeatherData = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code&hourly=temperature_2m,weather_code&timezone=auto`;

  const response = await axios.get(url);
  return response.data;
};
