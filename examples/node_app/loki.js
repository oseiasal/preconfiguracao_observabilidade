const winston = require('winston');
const LokiTransport = require('winston-loki');

const lokiTransport = new LokiTransport({
    host: 'http://localhost:3100',
    labels: { app: 'exemplo-de-teste', },
    json: true,
    format: winston.format.json(),
    replaceTimestamp: true,
    onConnectionError: (err) => console.error(err),
});

exports.logger = winston.createLogger({
    level: 'info',
    transports: [
        lokiTransport,
        new winston.transports.Console(),
    ],
});
