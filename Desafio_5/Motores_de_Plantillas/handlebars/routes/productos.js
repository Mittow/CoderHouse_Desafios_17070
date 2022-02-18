const express = require("express");
const router = express.Router();

const ProductsController = require("../app/controllers/productsController");
const validatorHandler = require('../app/middlewares/validator');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../app/schemas/schema');

router.get('/',  ProductsController.getAllProducts.bind(ProductsController));
router.post('/', validatorHandler(createProductSchema, 'body'), ProductsController.generateProduct.bind(ProductsController));

module.exports = router;