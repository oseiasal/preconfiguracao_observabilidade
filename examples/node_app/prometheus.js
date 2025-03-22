const { Counter, Histogram } = require("prom-client");

//  Criar uma métrica Prometheus
exports.httpRequestsTotal = new Counter({
    name: "http_requests_total",
    help: "Total de requisições recebidas",
    labelNames: ["method", "route", "status"],
});

// Criar uma métrica de histograma para a duração das requisições HTTP
exports.httpRequestDuration = new Histogram({
    name: "http_request_duration_seconds",
    help: "Duração das requisições HTTP em segundos",
    labelNames: ["method", "route", "status"],
});