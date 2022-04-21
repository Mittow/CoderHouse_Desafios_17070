function random (n) {
  const numeros = {}

  // {
  //   1: 10,
  //   2: 15.
  // }

  function getRandomInt() {
    return Math.floor(Math.random() * (n - 1)) + 1;
  }

  for (let i = 1; i <= n; i++) {
    const p = getRandomInt()

    numeros[p] = (numeros[p] || 0) + 1
  }

  return numeros
}

process.on("message", (obj) => {
  if (obj.message === "start") {
    const numeros = random(obj.numero)
    process.send(numeros)
    process.exit()
  }
})