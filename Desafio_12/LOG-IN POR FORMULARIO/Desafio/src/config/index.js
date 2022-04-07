module.exports = {
  mongoConfig: {
    HOSTNAME: 'cluster0.nilfq.mongodb.net',
    SCHEMA: 'mongodb+srv',
    USER: 'facundo',
    PASSWORD: process.env.MONGO_PASSWORD,
    DATABASE: 'ecommerce',
    OPTIONS: 'retryWrites=true&w=majority',
  },
};
