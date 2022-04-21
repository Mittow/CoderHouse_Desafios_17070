const path = require("path")
const dotenv = require("dotenv").config({
  path: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, ".env.production") : path.resolve(__dirname, ".env.local")
})

const server = require("express")()
const { fork } = require("child_process")

console.log(process.env)


console.log("conectar a mongo")
console.log(process.env.MONGOURI || "respaldo.com")

server.get("/random", (req, res) => {
  const { query } = req
  console.log(query)

  console.time("time")
  // const aleatorios = random(+query.num || 200000)
  // res.send(aleatorios)
  const random = fork(__dirname + "/random.js")

  random.send({
    message: "start",
    numero: +query.num || 200000
  })
  
  random.on("message", (message) => {
    console.log(message)
    res.send(message)
  })

  console.timeEnd("time")
})

server.listen(process.env.PORT || 8080, () => console.log(`listening on http://localhost:${process.env.PORT || 8080}`))
