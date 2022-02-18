/* ===============================================DESAFIO-2====================================================== */
// ALUMNO: Bianco Salinas, Gian Franco

const fs = require('fs').promises;
const path = require('path');

class Contenedor {
    constructor (file) {
        this.file = path.join(__dirname, file);
    }

    async save (obj) {
        try {
            const txt = await fs.readFile(this.file, 'utf-8');
            const data = JSON.parse(txt);
            const ultimo = data[data.length - 1];
            const firstId = (ultimo != undefined) ? (ultimo.id + 1) : 1;        
            data.push({
                id: firstId,
                ...obj
            });
            await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf8');
            return console.log("Objeto agregado satisfactoriamente con el id: ", firstId);
            
        } catch (error) {
            console.error("Hubo un error :", error);
        }
    }

    async getById (id) {
        try {
            const txt = await fs.readFile(this.file, 'utf-8');
            const data = JSON.parse(txt);
            const result = data.find(objeto => objeto.id == id);
            (result == undefined)?console.log('Objeto no encontrado: null'):console.log('Objeto encontrado :', result);

        } catch (error) {
            console.error("Hubo un error :", error);
        }
    }

    async getAll () {
        try {
            const txt = await fs.readFile(this.file, 'utf-8');
            const data = JSON.parse(txt);
            return console.log(data);
            
        } catch (error) {
            console.error("Hubo un error :", error);
        }
    }

    async deleteById (id) {
        try {
            const txt = await fs.readFile(this.file, 'utf-8');
            const data = JSON.parse(txt);
            const result = data.find(objeto => objeto.id == id);
            const indexObjeto = data.indexOf(result);
            if(indexObjeto >= 0){
                data.splice(indexObjeto, 1);
                await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf-8');
                console.log(`Objeto con id: ${id} eliminado satisfactoriamente!!!`);
            } else {
                console.log(`El objeto con id: ${id} no existe`);
            }
            
        } catch (error) {
            console.error("Hubo un error :", error);
        }
    }

    async deleteAll () {
        try {
            const txt = await fs.readFile(this.file, 'utf-8');
            const data = JSON.parse(txt);
            data.splice(0, data.length);
            await fs.writeFile(this.file, JSON.stringify(data), 'utf-8');
            console.log(`Array de objetos eliminado satisfactoriamente!!!`);

        } catch (error) {
            console.error("Hubo un error :", error);
        }
    }
}

module.exports = Contenedor;