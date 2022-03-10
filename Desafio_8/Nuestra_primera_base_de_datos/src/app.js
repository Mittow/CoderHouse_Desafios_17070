const http = require('http')
const path = require('path')
const express = require('express')
const app = express()

const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);

const modelChat = require('./models/modelChat');
const modelProduct = require('./models/modelProduct');

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

async function createTables() {
    await modelProduct.createTable();
    await modelChat.createTable();
}
createTables();

//Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

//Socket
io.on('connection', async (socket) => {
    console.log("Cliente conectado con id: ", socket.id);

    /*===========================PRODUCTOS===========================*/
    //CARGAR PRODUCTOS
    socket.emit('products', await modelProduct.getAll());

    //GUARDAR NUEVO PRODUCTO 
    socket.on('form', async (data) => {
        await modelProduct.add(data);
        socket.emit('products', await modelProduct.getAll());
    });

    /*==============================CHAT==============================*/
    //MENSAJES
    socket.emit('msgAll', await modelChat.getAll());

    //ACTUALIZACION DE MENSAJES 
    socket.on('newMsg', async (mgs) => {
        mgs.date = new Date().toLocaleString()
        await modelChat.add(mgs)
        socket.emit('msgAll', await modelChat.getAll());
    });
    
});

const servidor = server.listen(PORT, () => console.log(`Escuchando http://localhost:${PORT}`));
servidor.on("error", (error) => console.log(`Hubo un error al levantar el servidor: ${error.message}`))
