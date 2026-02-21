const express = require('express');
const { getWeather } = require('../controllers/externalController');

const router = express.Router();

router.get('/weather', getWeather);

module.exports = router;
