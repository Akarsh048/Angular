const axios = require('axios');

const getWeather = async (req, res, next) => {
  try {
    const lat = Number(req.query.lat ?? 28.6139);
    const lon = Number(req.query.lon ?? 77.2090);

    const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,wind_speed_10m,weather_code'
      }
    });

    return res.json({
      location: { latitude: lat, longitude: lon },
      current: data.current
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getWeather };
