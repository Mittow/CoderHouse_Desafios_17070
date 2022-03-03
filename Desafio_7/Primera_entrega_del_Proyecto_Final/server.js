const express = require("express");
const app = express();

const routeProductos = require("./routers/productos");
const routeCarrito = require("./routers/carrito");

//SETTINGS
app.set("port", process.env.PORT || 8080);

//STATIC FILES
//app.use("/static", express.static("public"));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//BASE ROUTES
app.use("/api/productos", routeProductos);
app.use("/api/carrito", routeCarrito);
app.use("*", (req, res) => {
    res.status(404).json({error: -2, descripcion: `${req.url} ${req.method} no implementada`});
});

//SERVER
const server = app.listen(app.get("port"), () => {
    console.log(`Servidor levantado en: http://localhost:${app.get("port")}`);
});
server.on("error", (error) => console.error(`Hubo un error al levantar el servidor: ${error.message}`));