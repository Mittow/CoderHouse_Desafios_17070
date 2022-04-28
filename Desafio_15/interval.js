const moment = require("moment")

module.exports = () => {
  console.log(`Iniciando proceso ${process.pid}`)
  let contador = 10
  const interval = setInterval(() => {
    if (contador == 0) {
      clearInterval(interval)
      process.exit()
    }

    console.log(process.pid, moment().format("DD-MM-YYYY HH:mm:ss"))
    contador -= 1
  }, 1000)
}