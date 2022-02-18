/* ===============================================DESAFIO-2====================================================== */
// ALUMNO: Bianco Salinas, Gian Franco

const Contenedor = require('./contenedor');

const instancia = new Contenedor ('productos.txt');

async function test () {

    //AGREGAR NUEVOS PRODUCTOS:
    //await instancia.save({ title: "Ventilador", price: 15000, thumbnail: "https://placedog.net/233" });
    //await instancia.save({ title: "Televisor", price: 16000, thumbnail: "https://placedog.net/450" });
    //await instancia.save({ title: "Celular", price: 18000, thumbnail: "https://placedog.net/100" });

    //OBTENER PRODUCTO POR ID:
    //await instancia.getById(1);

    //OBTENER TODOS LOS PRODUCTOS:
    //await instancia.getAll();

    //BORRAR PRODUCTO POR ID:
    //await instancia.deleteById(2);

    //BORRAR TODOS LOS PRODUCTOS:
    //await instancia.deleteAll();
}

test();
