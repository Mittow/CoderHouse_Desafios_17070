const path = require('path');
const knex = require('knex')

class ModelChat {
  constructor() {
    this.filePath = path.join(__dirname, '../db/ecommerce.sqlite')
    this.db = knex({
      client: 'sqlite3',
      connection: { filename: this.filePath },
      useNullAsdefault: true
    });
  }
  
  async createTable() {
    try {
      await this.db.schema.dropTableIfExists("mensajes");
      await this.db.schema.createTable("mensajes", (table) => {
        table.increments('id')
        table.string('de')
        table.string('mensaje')
        table.string('date')
      });
      console.log("TABLA MENSAJES CREADA")
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAll(){
    const msg = await this.db.select().from('mensajes');
    return msg;
  }

  async add(msg) {
    await this.db('mensajes').insert(msg);
  }

}

module.exports = new ModelChat ();