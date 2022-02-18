const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/productos");

const port = process.env.PORT || 8080;

//Midlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static('public'));

//Engine
app.set("view engine", "ejs");
app.set("views", "./views/layout");

//Rutas
app.use("/productos", routes);

//Server
const server = app.listen(port, () => console.log(`Servidor escuchando en el puerto: ${port}`));
server.on("error", (error) => console.error(`Error en el servidor: ${error.message}`));