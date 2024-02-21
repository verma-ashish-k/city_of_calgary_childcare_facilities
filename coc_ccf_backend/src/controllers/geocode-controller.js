//controllers/geocode-controller.js

const axios = require('axios');
const { geocodeApi } = require('../config/api-config');

async function fetchGeocode(address) {

    try {
        const response = await axios.get(geocodeApi, {
        params: {
            q: address,
            format: 'json',
        }
        });
        return location;
    } catch (error) {
        throw error; // This error should be handled in the route
    }
    }

module.exports = fetchGeocode;