const express = require("express");
const router = express.Router();

const ProductsController = require("../app/controllers/productsController");
const validatorHandler = require('../app/middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../app/schemas/schema');

router.get('/',  ProductsController.getAllProducts.bind(ProductsController));
router.get('/:id', validatorHandler(getProductSchema, 'params'), ProductsController.getProductById.bind(ProductsController));
router.post('/', validatorHandler(createProductSchema, 'body'), ProductsController.generateProduct.bind(ProductsController));
router.put('/:id', [validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body')], ProductsController.updateProduct.bind(ProductsController));
router.delete('/:id', ProductsController.deleteProductById.bind(ProductsController));

module.exports = router;

