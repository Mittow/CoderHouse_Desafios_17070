const productModel = require('../models/products');
const faker = require('faker');

module.exports = {
  get: async (req, res) => {
    const { orderBy, search } = req.query;
    try {
      const products = await productModel.getAll(orderBy, search);
      res.send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productModel.getById(id);
      res.send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  put: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const product = await productModel.update(id, body);
      res.status(200).send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  post: async (req, res) => {
    let { body } = req;
    try {
      if (!body.name || !body.url || !body.price) {
        const productFaker = {
          name: faker.commerce.productName(),
          url: faker.image.image(),
          price: faker.commerce.price(),
          timestamp: Date.now(),
        };
        body = productFaker;
      }
      const product = await productModel.create(body);
      res.status(201).send(product);
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await productModel.delete(id);
      res.status(200).send({
        message: 'Producto eliminado',
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e.message,
      });
    }
  },
};
