const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');
moment.locale('es'); //modulo moment en idioma español

class CarritoController {

    constructor () {
        this.filePath = path.join(__dirname, '../database/carrito.json');
        this.administrador = true; //VARIABLE BOOLEANA ADMIN 
    }

    async createCarrito (req, res) {
        if (this.administrador == true) {
            try {
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const longArray = data[data.length - 1]; //longitud del array de objetos
                const newId = (longArray != undefined)?(longArray.id + 1):1; //creando nuevo ID para el producto 
                const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a'); //obteniendo la fecha y hora al momento de guardar
                const obj = {id: newId, timestamp, productos: [] }; //nuevo objeto
                data.push(obj); //agregando nuevo objeto en el array de objetos
                await this.writeData(data); //guardando cambios en el archivo //guardando cambios en el archivo
                res.status(200).json({message: `Carrito creado con el id: ${newId}`});
            } catch (error) {
                res.status(500).json({error: 'Error interno del servidor'});
                console.error(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/carrito/ POST no autorizada"});
        }
    }

    async getProductsByCarrito (req, res) {
        if (this.administrador == true) {
            try {
                const { id } = req.params;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                if(id){ //si existe el ID
                    const result = data.find(objeto => objeto.id == id); //encontrar el objeto mediante su ID
                    (result == undefined)?res.status(404).json({error: 'Carrito no encontrado'}):res.status(200).json(result);
                } else { //si no existe el ID
                    res.status(200).json(data);
                }
            } catch (error) {
                res.status(500).json({error: 'Error interno en el servidor'});
                console.log(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/carrito/:id/productos GET no autorizada"});
        }
    }

    async deleteCarrito (req, res) {
        if (this.administrador == true) {
            try {
                const { id } = req.params;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const result = data.find(objeto => objeto.id == id); //busca el objeto por su id
                const indexObjeto = data.indexOf(result); //devuelve el índice del objeto encontrado
                if(indexObjeto >= 0){
                    data.splice(indexObjeto, 1); //elimina el objeto en el array
                    await this.writeData(data); //guarda todos los cambios en el archivo
                    res.status(200).json({message: `Carrito con id: ${id}, eliminado satisfactoriamente!!!`});
                } else {
                    res.status(404).json({error: `Carrito no encontrado`});
                }
            } catch (error) {
                res.status(500).json({error: 'Internal Server Error'});
                console.error(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/carrito/:id DELETE no autorizada"});
        }
    }

    async saveProductByCarrito (req, res) {
        if (this.administrador == true) {
            try {
                const { id } = req.params;
                const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const result = data.find(objeto => objeto.id == id); //encontrar el objeto mediante su id
                if(result == undefined) { //no existe el id del carrito
                    res.status(404).json({error: `Carrito no encontrado`});
                } else { //si existe el id del carrito
                    const longArray = result.productos[result.productos.length - 1]; //longitud del array de objetos de productos
                    const newId = (longArray != undefined)?(longArray.id + 1):1; //creando nuevo id para el producto
                    const precioToFloat = parseFloat(precio); //parseando el parametro "price" a flotante  
                    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a'); //obteniendo la fecha y hora al momento de guardar
                    const obj = { id: newId, timestamp, nombre, descripcion, codigo, foto, precio: precioToFloat, stock }; //nuevo objeto
                    result.productos.push(obj); //agregando el nuevo objeto en el array de objetos de productos
                    await this.writeData(data); //guardando cambios en el archivo 
                    res.status(200).json({message: `Producto con id ${newId} guardado en el carrito con id ${id} `});
                }
            } catch (error) {
                res.status(500).json({error: 'Error interno del servidor'});
                console.error(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/carrito/:id/productos POST no autorizada"});
        }
    }

    async deleteProductByCarrito (req, res) {
        if (this.administrador == true) {
            try {
                const { id, id_prod } = req.params;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const resultCarrito = data.find(carrito => carrito.id == id); //busca el objeto carrito por su id
                if(resultCarrito != undefined){ //si existe el carrito
                    const resultProducto = resultCarrito.productos.find(producto => producto.id == id_prod); //busca el objeto producto dentro del objeto carrito por su id
                    const indexObjeto = resultCarrito.productos.indexOf(resultProducto); //devuelve el índice del objeto producto encontrado
                    if(indexObjeto >= 0){ //si existe el id del producto
                        resultCarrito.productos.splice(indexObjeto, 1); //elimina el objeto en el array
                        await this.writeData(data); //guarda todos los cambios en el archivo
                        res.status(200).json({message: `Producto con el id ${id_prod}, del carrito con el id ${id}, eliminado satisfactoriamente!!!`});
                    } else { //no existe el id del producto
                        res.status(404).json({error: 'Producto no encontrado'});
                    }
                } else { //no existe el carrito
                    res.status(404).json({error: 'Carrito no encontrado'});
                }
            } catch (error) {
                res.status(500).json({error: 'Internal Server Error'});
                console.error(error);
            } 
        } else {
            res.status(403).json({error: -1, descripcion: "/api/carrito/:id/productos/:id_prod DELETE no autorizada"});
        }
    }

    async readData () {
        const result = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(result);
    }

    async writeData (data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}

module.exports = new CarritoController();