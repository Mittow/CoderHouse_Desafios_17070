/* ===============================================DESAFIO-3====================================================== */
// ALUMNO: Bianco Salinas, Gian Franco

const express = require('express');
const app = express();
const Contenedor = require('./contenedor');
const instancia = new Contenedor('productos.txt');

const port = process.env.PORT || 5050;

app.get('/productos', async (req, res) => {
    try {
        const result = await instancia.getAll();
        res.status(200).send(JSON.stringify(result));
        
    } catch (error) {
        res.status(404).send('Not Found');
    }
});

app.get('/productoRandom', async (req, res) => {
    try {
        const data = await instancia.getAll();
        const Random = Math.floor(Math.random() * (data.length));
        res.status(200).send(JSON.stringify(data[Random]));
        
    } catch (error) {
        res.status(404).send('Not Found');
    }
});

app.listen(port, () => console.log(`Escuchando en : http://localhost:${port}`));

// ############# DESAFIO 2 ############## //
async function test () {

    //AGREGAR NUEVOS PRODUCTOS:
    //await instancia.save({ title: "Ventilador", price: 15000, thumbnail: "https://placedog.net/233" });
    //await instancia.save({ title: "Televisor", price: 16000, thumbnail: "https://placedog.net/450" });
    //await instancia.save({ title: "Celular", price: 18000, thumbnail: "https://placedog.net/100" });

    //OBTENER PRODUCTO POR ID:
    //await instancia.getById(1);

    //OBTENER TODOS LOS PRODUCTOS:
    //console.log(await instancia.getAll());

    //BORRAR PRODUCTO POR ID:
    //await instancia.deleteById(2);

    //BORRAR TODOS LOS PRODUCTOS:
    //await instancia.deleteAll();
}

test();
