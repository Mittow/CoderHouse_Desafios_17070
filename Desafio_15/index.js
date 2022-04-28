const app = require("./server")
const PORT = process.argv[2] || 8080

app.listen(PORT, () => console.log(`listening on: http://localhost:${PORT}\n`))
