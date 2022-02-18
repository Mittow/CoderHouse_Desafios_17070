// VALIDADOR DE DATOS RECIBIDOS //
const Joi = require('joi');

const id = Joi.number(); // id debe ser numerico
const title = Joi.string().min(2).max(20); // title debe ser un string que tiene como minimo 2 letras y maximo 15 letras
const price = Joi.number().min(1); // price debe ser numerico y mayor o igual de 1
const thumbnail = Joi.string().uri(); // thumbnail debe ser string y tipo url

const createProductSchema = Joi.object({
    title: title.required(),
    price: price.required(),
    thumbnail: thumbnail.required()
});

module.exports = { createProductSchema }