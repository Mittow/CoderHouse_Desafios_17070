const knex = require('knex');
const path = require('path');

class ModelProduct {
  constructor() {
    this.db = knex({
      client: "mysql",
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "websocket"
      }
    });
  }
  
  async createTable() {
    try {
      await this.db.schema.dropTableIfExists("productos");
      await this.db.schema.createTable("productos", (table) => {
        table.increments('id')
        table.string('name')
        table.integer('price')
        table.string('image')
      });
      console.log("TABLA PRODUCTOS CREADA")

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAll(){
    const productos = await this.db.select().from('productos');
    return productos;
  }

  async add(producto) {
    await this.db('productos').insert(producto);
  }
}

module.exports = new ModelProduct ();