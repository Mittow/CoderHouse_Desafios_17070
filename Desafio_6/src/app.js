const http = require('http')
const path = require('path')
const express = require('express')
const app = express()

const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

const Model = require('./models/model')
const modelProducts = new Model('../database/products.json')
const modelChat = new Model('../database/chat.json')
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

//Socket
io.on('connection', async (socket) => {
    console.log("Cliente conectado con id: ", socket.id);

    //CARGAR PRODUCTOS
    const products = await modelProducts.getAll();    
    socket.emit('products', products);

    //GUARDAR NUEVO PRODUCTO 
    socket.on('form', async (data) => {
        await modelProducts.add(data);
    });

    //MENSAJES
    socket.emit('msgAll', await modelChat.getAll());

    //ACTUALIZACION DE MENSAJES 
    socket.on('newMsg', async mgs => {
        mgs.date = new Date().toLocaleString()
        await modelChat.add(mgs)
        socket.emit('msgs', await modelChat.getAll());
    });
    
});

const servidor = server.listen(PORT, () => console.log(`Escuchando http://localhost:${PORT}`));
servidor.on("error", (error) => console.log(`Hubo un error al levantar el servidor: ${error.message}`))