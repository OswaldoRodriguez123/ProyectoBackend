const Product = require("../../models/mongoDB/products/product.model");

class ProductDAO {
  constructor() {
    this.model = Product;
  }

  async save(product) {
    try {
      return await this.model.create(product);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateById(id, data) {
    try {
      const product = await this.model.findByIdAndUpdate(
        id,
        data,
        "after"
      );
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteById(id) {
    try {
      const product = await this.model.findByIdAndDelete(id);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = ProductDAO;