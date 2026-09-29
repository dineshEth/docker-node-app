import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = 8080
const HOST = "0.0.0.0"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "pages")));

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "pages", "home.html"))
});

app.get("/health", (_, res) => {
    res.status(200).json({
        status: "ok",
        statusCode: 200,
        message: "Service is healthy",
        service: "docker-guide",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})