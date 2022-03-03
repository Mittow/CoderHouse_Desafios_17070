const express = require("express");
const router = express.Router();

const CarritoController = require("../app/controllers/carritoController");

// MIDDLEWARE PARA VALIDAR DATOS//
const validatorHandler = require('../app/middlewares/validator');
const {saveProductByCarritoSchema, deleteProductByCarritoSchema, getIdSchema} = require('../app/schemas/schemaCarrito');

// RUTAS DE PRODUCTO
router.post('/', CarritoController.createCarrito.bind(CarritoController));
router.delete('/:id', validatorHandler(getIdSchema, 'params'), CarritoController.deleteCarrito.bind(CarritoController));
router.get('/:id/productos', validatorHandler(getIdSchema, 'params'), CarritoController.getProductsByCarrito.bind(CarritoController));
router.post('/:id/productos', [validatorHandler(getIdSchema, 'params'), validatorHandler(saveProductByCarritoSchema, 'body')], CarritoController.saveProductByCarrito.bind(CarritoController));
router.delete('/:id/productos/:id_prod', validatorHandler(deleteProductByCarritoSchema, 'params'), CarritoController.deleteProductByCarrito.bind(CarritoController));

module.exports = router;