import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = 8080
const HOST = "0.0.0.0"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"))
});


app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})