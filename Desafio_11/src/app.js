const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { schema, normalize } = require('normalizr');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const productsRouter = require('./routes/products');

const { URI_CLOUD_CONNECTION } = require('./config/mongoConfig');
const PORT = process.env.PORT || 8080;
const chatRoom = require('./models/chat');

//Conexion con mongo en la nube
mongoose
  .connect(URI_CLOUD_CONNECTION)
  .then(() => {
    //Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static('public'));

    //Routes
    app.get('/', (req, res) =>
      res.sendFile(path.join(__dirname, 'public/index.html'))
    );
    app.use('/api/productos-test', productsRouter);

    //Socket
    io.on('connection', async (socket) => {
      socket.emit('allgames');
      //Post
      socket.emit('newGame');

      // actualizacion de mensajes
      socket.on('newMsg', async (mgs) => {
        await chatRoom.add(mgs);
        await chatRoom.readMsg();
        socket.emit('msgAll', await chatRoom.readMsg());
      });
      // Mensajes
      socket.emit('msgAll', await chatRoom.readMsg());
    });

    server.listen(PORT, () =>
      console.log(`Escuchando http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(err));
