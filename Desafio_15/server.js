const express = require("express")
const app = express()

const PORT = process.argv[2] || 8080

app.get("/", (req, res) => {
  console.log("principal")
  res.send({
    pid: process.pid,
    name: "server",
    cpus: 8
  })
})

app.get("/end", (req, res) => {
  res.send("voy a detener este proceso")
  process.exit()
})

app.get("/hi", (req, res) => {
  console.log("peticion recibida hi")
  res.send("hi")
})

app.all("*", (req, res) => res.sendStatus(404))

// app.listen(PORT, () => console.log(`listening on: http://localhost:${PORT}\n`))

module.exports = app