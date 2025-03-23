const axios = require('axios');
const { logger } = require('./loki');

const URL = 'http://localhost:8080';

async function makeRequest(type) {
    try {
        if (type === 'success') {
            await axios.get(URL);
            logger.info('Success request');
        } else if (type === 'error') {
            await axios.get(`${URL}/nonexistent`);
            logger.warn('Error request');
        } else if (type === 'slow') {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await axios.get(URL);
            logger.info('Slow request');
        } else if (type === 'fast') {
            await axios.get(URL);
            logger.info('Fast request');
        }
    } catch (error) {
        logger.error('Request failed', { message: error.message });
    }
}

function simulateRequests() {
    setInterval(() => makeRequest('success'), 1000);
    setInterval(() => makeRequest('error'), 5000);
    setInterval(() => makeRequest('slow'), 7000);
    setInterval(() => makeRequest('fast'), 3000);
}

simulateRequests();
