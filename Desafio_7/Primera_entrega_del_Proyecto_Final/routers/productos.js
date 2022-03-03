const express = require("express");
const router = express.Router();

const ProductsController = require("../app/controllers/productsController");

// MIDDLEWARE PARA VALIDAR DATOS//
const validatorHandler = require('../app/middlewares/validator');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../app/schemas/schemaProducts');

// RUTAS DE PRODUCTO
router.get('/', validatorHandler(getProductSchema, 'query'), ProductsController.getAllProducts.bind(ProductsController));
router.post('/', validatorHandler(createProductSchema, 'body'), ProductsController.saveProduct.bind(ProductsController));
router.put('/:id', [validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body')], ProductsController.updateProduct.bind(ProductsController));
router.delete('/:id', validatorHandler(getProductSchema, 'params'), ProductsController.deleteProductById.bind(ProductsController));

module.exports = router;

