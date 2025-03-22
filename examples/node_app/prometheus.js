const { Counter } = require("prom-client");

//  Criar uma métrica Prometheus
exports.httpRequestsTotal = new Counter({
    name: "http_requests_total",
    help: "Total de requisições recebidas",
    labelNames: ["method", "route", "status"],
});