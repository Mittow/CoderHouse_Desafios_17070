const mongoose = require('mongoose');

class Product {
  constructor() {
    const schema = new mongoose.Schema({
      name: { type: String },
      url: { type: String },
      price: { type: Number },
      timestamp: { type: Date },
    });

    // Model
    this.model = mongoose.model('productos', schema);
  }

  async create(obj) {
    const product = await this.model.create(obj);
    console.log('--------------------');
    console.log(JSON.stringify(product, null, 2));

    return product;
  }

  async getAll(orderBy = '', search = '') {
    let products = [];
    let find = search ? { name: { $regex: search, $options: 'i' } } : {};
    if (orderBy) {
      const sort = {};
      sort[orderBy] = -1;
      products = await this.model.find(find).sort(sort);
    } else {
      products = await this.model.find(find);
    }
    console.log(`Productos en DB: ${products.length}`);

    // projections de mongo
    return await this.model.find(find, {
      name: 1,
      description: 1,
      code: 1,
      url: 1,
      price: 1,
      stock: 1,
      timestamp: 1,
    });
  }

  async getById(id) {
    console.log(id);
    const product = await this.model.findById(id);
    console.log(product);
    return product;
  }

  async update(id, body) {
    const product = await this.model.findByIdAndUpdate(id, body);
    console.log('--------------------');
    console.log('Producto actualizado');
    return product;
  }

  async delete(id) {
    await this.model.findByIdAndDelete(id);
    console.log('--------------------');
    console.log('Producto eliminado');
  }
}

module.exports = new Product();
