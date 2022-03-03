const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');
moment.locale('es'); //modulo moment en idioma español

class ProductsController {

    constructor(){
        this.filePath = path.join(__dirname, '../database/products.json');
        this.administrador = true; //VARIABLE BOOLEANA ADMIN 
        this.usuario = true; //VARIABLE BOOLEANA PARA USERS
    }

    // Devuelve todos los productos o devuelve producto por ID
    async getAllProducts(req, res) {
        if (this.administrador == true || this.usuario == true) {
            try {
                const { id } = req.query;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                if(id){ //si existe el ID
                    const result = data.find(objeto => objeto.id == id); //encontrar el objeto mediante su id
                    (result == undefined)?res.status(404).json({error: 'Producto no encontrado'}):res.status(200).json(result);
                } else { //si no existe el ID
                    res.status(200).json(data);
                }
            } catch (error) {
                res.status(500).json({error: 'Error interno en el servidor'});
                console.log(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/productos?id GET no autorizada"});
        }
    } 

    // Recibe y agrega un producto, y lo devuelve con su id asignado 
    async saveProduct(req, res) {
        if (this.administrador == true) {
            try {
                const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const longArray = data[data.length - 1]; //longitud del array de objetos
                const newId = (longArray != undefined)?(longArray.id + 1):1; //creando nuevo ID para el producto
                const precioToFloat = parseFloat(precio); //parseando el parametro "price" a flotante  
                const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a'); //obteniendo la fecha y hora al momento de guardar
                const obj = {id: newId, timestamp, nombre, descripcion, codigo, foto, precio: precioToFloat, stock }; //nuevo objeto
                data.push(obj); //agregando nuevo objeto en el array de objetos
                await this.writeData(data); //guardando cambios en el archivo //guardando cambios en el archivo
                res.status(200).json(`Producto guadado con id: ${newId}`);
            } catch (error) {
                res.status(500).json({error: 'Error interno del servidor'});
                console.error(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/productos/ POST no autorizada"});
        }
    }

    // Recibe y actualiza un producto según su id 
    async updateProduct(req, res) {
        if (this.administrador == true) {
            try {
                const { id } = req.params;
                const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const result = data.find(objeto => objeto.id == id); //busca el objeto mediante su id
                const indexObjeto = data.indexOf(result); //retorna el índice del objeto encontrado
                if(indexObjeto >= 0){  //verifica si existe el índice del objeto buscado
                    const idToInt = parseInt(id, 10); //por defecto en el req.params devuelve en string, por ende se parsea a Integer
                    const precioToFloat = parseFloat(precio); //parseando el parametro "price" a flotante 
                    const obj = {id: idToInt, timestamp, nombre, descripcion, codigo, foto, precio: precioToFloat, stock }; //nuevo objeto
                    data.splice(indexObjeto, 1, obj); //reemplazando el objeto antiguo por el nuevo en el array de objetos
                    await this.writeData(data); //guardando cambios en el archivo
                    res.status(200).json(`Producto con id: ${id} actualizado satisfactoriamente!!!`);
                } else {
                    res.status(404).json({error: 'Producto no encontrado'});
                } 
            } catch (error) {
                res.status(500).json({error: 'Error interno del servidor'});
                console.error(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/productos/:id PUT no autorizada"});
        }
    }

    // Elimina un producto según su id 
    async deleteProductById(req, res) {
        if (this.administrador == true) {
            try {
                const { id } = req.params;
                const data = await this.readData(); //lee el archivo y lo retorna en json
                const result = data.find(objeto => objeto.id == id);
                const indexObjeto = data.indexOf(result);
                if(indexObjeto >= 0){
                    data.splice(indexObjeto, 1);
                    await this.writeData(data);
                    res.status(200).json(`Producto con id: ${id} eliminado satisfactoriamente!!!`);
                } else {
                    res.status(404).json({error: 'Producto no encontrado'});
                }
            } catch (error) {
                res.status(500).json({error: 'Internal Server Error'});
                console.error(error);
            }
        } else {
            res.status(403).json({error: -1, descripcion: "/api/productos/:id DELETE no autorizada"});
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

module.exports = new ProductsController();