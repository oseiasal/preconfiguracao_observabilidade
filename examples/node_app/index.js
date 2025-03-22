const express = require("express");
const { logger } = require("./loki");
const { register, httpRequestsTotal, httpRequestDuration } = require("./prometheus");

const app = express();
const PORT = 8080;

// 📄 Rota de métricas Prometheus
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// Rota padrão
app.get("/", (req, res) => {
    const end = httpRequestDuration.startTimer();
    httpRequestsTotal.inc({ method: "GET", route: "/", status: 200 });
    logger.info("Requisição para rota principal!", { label: "app" });
    res.send("Hello, observability!");
    end({ method: "GET", route: "/", status: 200 });
});

// Rodar aplicação
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});