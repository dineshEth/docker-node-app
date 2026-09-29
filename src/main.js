import express from "express"

const app = express()
const PORT = 8080
const HOST = "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})