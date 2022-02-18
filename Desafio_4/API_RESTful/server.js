const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const routeProducts = require("./routes/products");

const port = process.env.PORT || 8080;

// Midlewares
app.use(cors());
app.use(express.json()); // Para que express pueda interpretar información tipo JSON
app.use(express.urlencoded({ extended: false })); // Para que express pueda interpretar información recibida desde un HTML
app.use("/", express.static(path.join(__dirname, "public"))); // Ejecuta todo el contenido estatico de la carpeta public
app.use("/docs", express.static(path.join(__dirname, "docs"))); // Ejecuta todo el contenido de la carpeta docs

// Rutas
app.use('/api/productos', routeProducts);

const server = app.listen(port, () => console.log(`Servidor http escuchando en el puerto ${server.address().port}`));
server.on("error", err => console.log(`Error en el servidor ${err.message}`)); 