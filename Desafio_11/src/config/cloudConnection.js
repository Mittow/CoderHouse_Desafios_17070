const mongoose = require('mongoose');
const { URI_CLOUD_CONNECTION } = require('./mongoConfig');

const connection = async () => {
  try {
    await mongoose.connect(URI_CLOUD_CONNECTION);
    console.log('Conexión a mongo correcta');
  } catch (error) {
    console.log('Error al conectar a mongo', error);
  }
};

module.exports = connection;
