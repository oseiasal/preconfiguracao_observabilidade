const axios = require('axios');

const URL = 'http://localhost:8080';

async function makeRequest(type) {
    try {
        if (type === 'success') {
            await axios.get(URL);
            console.log('Success request');
        } else if (type === 'error') {
            await axios.get(`${URL}/nonexistent`);
            console.log('Error request');
        } else if (type === 'slow') {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await axios.get(URL);
            console.log('Slow request');
        } else if (type === 'fast') {
            await axios.get(URL);
            console.log('Fast request');
        }
    } catch (error) {
        console.error('Request failed', error.message);
    }
}

function simulateRequests() {
    setInterval(() => makeRequest('success'), 1000);
    setInterval(() => makeRequest('error'), 5000);
    setInterval(() => makeRequest('slow'), 7000);
    setInterval(() => makeRequest('fast'), 3000);
}

simulateRequests();
