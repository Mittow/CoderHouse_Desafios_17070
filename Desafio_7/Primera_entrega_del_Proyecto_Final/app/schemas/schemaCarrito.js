// VALIDADOR DE DATOS RECIBIDOS //
const joi = require('joi');

const id = joi.number(); //id debe ser numerico
const id_prod = joi.string(); //id_prod debe ser un string
const nombre = joi.string().min(2).max(30); //nombre debe ser un string que tiene como minimo 2 letras y maximo 20 letras
const descripcion = joi.string().max(30); //descripcion debe ser string que tiene como minimo 0 letras y maximo 30 letras 
const codigo = joi.string().alphanum(); //codigo debe ser string y alfanumerico
const foto = joi.string().uri(); //foto debe ser string y tipo url
const precio = joi.number().min(1); //precio debe ser numerico y mayor o igual de 1
const stock = joi.number().min(1).integer(); //stock debe ser un numerico entero y como mínimo 1

const getIdSchema = joi.object({
    id: id.required()
});

const saveProductByCarritoSchema = joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    codigo: codigo.required(),
    foto: foto.required(),
    precio: precio.required(),
    stock: stock.required()
});

const deleteProductByCarritoSchema = joi.object({
    id: id.required(),
    id_prod: id_prod.required()
});


module.exports = { 
    getIdSchema, 
    saveProductByCarritoSchema, 
    deleteProductByCarritoSchema 
};