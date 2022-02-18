// VALIDADOR DE DATOS RECIBIDOS //
const Joi = require('joi');

const id = Joi.number(); // id debe ser numerico
const title = Joi.string().min(2).max(15); // title debe ser un string que tiene como minimo 2 letras y maximo 15 letras
const price = Joi.number().min(1); // price debe ser numerico y mayor o igual de 1
const thumbnail = Joi.string().uri(); // thumbnail debe ser string y tipo url

const createProductSchema = Joi.object({
    title: title.required(),
    price: price.required(),
    thumbnail: thumbnail.required()
});

const updateProductSchema = Joi.object({
    id: id,
    title: title,
    price: price,
    thumbnail: thumbnail
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }