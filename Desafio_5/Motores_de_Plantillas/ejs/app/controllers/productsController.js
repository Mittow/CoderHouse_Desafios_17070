const fs = require('fs').promises;
const path = require('path');

class ProductsController {

    constructor(){
        this.filePath = path.join(__dirname, '../db/productos.txt');
    }

    // Devuelve todos los productos 
    async getAllProducts(req, res) {
        try {
            const txt = await fs.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(txt); // Pasando el string a objeto
                res.status(200).render("index", {data});  
        } catch (error) {
            res.status(404).json({error: 'El servidor no pudo encontrar el contenido solicitado'});
            console.log(error);
        }
    } 

    // Recibe y agrega un producto
    async generateProduct(req, res) {
        try {
            const { title, price, thumbnail } = req.body;
            const txt = await fs.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(txt); // Pasando el string a objeto
            const ultimo = data[data.length - 1];
            const firstId = (ultimo != undefined) ? (ultimo.id + 1) : 1;   
            const typePrice = parseFloat(price);     
            const obj = { title, price: typePrice, thumbnail };
            data.push({ id: firstId, ...obj }); // Agregando en el array de datos
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
            res.redirect(302, "http://localhost:8080/");
        } catch (error) {
            res.status(500).json({error: 'Error interno del servidor'});
            console.error(error);
        }
    }

    /*********************************************************************************/

    // Devuelve un producto según su id 
    async getProductById(req, res) {
        try {
            const  { id } = req.params;
            const txt = await fs.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(txt); // Pasando el string a objeto
            const result = data.find(objeto => objeto.id == id);
            if(result == undefined) {
                res.status(404).json({error: 'Producto no encontrado'});
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({error: 'Error interno del servidor'});
            console.error(error);
        }
    }

    // Recibe y actualiza un producto según su id 
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { title, price, thumbnail } = req.body;
            const txt = await fs.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(txt); // Pasando el string a objeto
            const result = data.find(objeto => objeto.id == id);
            const indexObjeto = data.indexOf(result);
            if(indexObjeto >= 0){
                const typeId = parseInt(id, 10); // Por defecto en el req.params devuelve en string, por ende se parsea a Integer
                const typePrice = parseFloat(price); 
                const obj = { id: typeId, title, price: typePrice, thumbnail };
                data.splice(indexObjeto, 1, obj);
                await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
                res.status(200).json(`Objeto con id: ${id} actualizado satisfactoriamente!!!`);
            } else {
                res.status(404).json({error: 'Producto no encontrado'});
            } 
        } catch (error) {
            res.status(500).json({error: 'Error interno del servidor'});
            console.error(error);
        }
    }

    // Elimina un producto según su id 
    async deleteProductById(req, res) {
        try {
            const { id } = req.params;
            const txt = await fs.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(txt); // Pasando el string a objeto
            const result = data.find(objeto => objeto.id == id);
            const indexObjeto = data.indexOf(result);
            if(indexObjeto >= 0){
                data.splice(indexObjeto, 1);
                await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
                res.status(200).json(`Objeto con id: ${id} eliminado satisfactoriamente!!!`);
            } else {
                res.status(404).json({error: 'Producto no encontrado'});
            }
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error'});
            console.error(error);
        }
    }

}

module.exports = new ProductsController();