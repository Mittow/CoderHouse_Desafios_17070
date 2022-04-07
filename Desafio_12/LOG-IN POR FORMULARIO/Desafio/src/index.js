(async () => {
  const express = require('express');
  const http = require('http');
  const mongoose = require('mongoose');
  const { Server } = require('socket.io');
  const path = require('path');
  require('dotenv').config();

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const PORT = process.env.PORT || 8080;

  // middlewares

  const cookieParser = require('cookie-parser');
  const session = require('express-session');

  // session store

  const MongoStore = require('connect-mongo');
  const { mongoConfig } = require('./config');
  const templateEngine = require('./engine/index');
  const chat = require('./chat');

  // routers

  const homeRouter = require('./routes/home');
  const productsRouter = require('./routes/products');
  const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } = mongoConfig;
  try {
    templateEngine(app);
    await mongoose.connect(
      `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS} `
    );
    console.log(
      `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
    );
    // json middlewares -> req.body {}
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser('esto es un secreto')); // req.cookies = {}
    app.use(
      session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,

        store: new MongoStore({
          mongoUrl: `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`,
          ttl: 1 * 60, // 1 min
          expires: 1000 * 1 * 60, // 1 min
          autoRemove: 'native',
        }),
      })
    ); // req.session

    app.use('/static/', express.static(path.join(__dirname, '../public')));
    app.use('/', homeRouter);
    app.use('/api/products', productsRouter);

    io.on('connection', chat);
    server.listen(PORT, () =>
      console.log(`listening on http://localhost:8080`)
    );
  } catch (error) {
    console.log(error);
  }
})();
