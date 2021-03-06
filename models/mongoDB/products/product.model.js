const Mongoose = require('mongoose');
const MongoDBContainer = require("../../containers/mongodb.container");

const Schema = Mongoose.Schema;
const collection = "products";

const schema = new Schema({
  id: Mongoose.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

module.exports = class ProductDAO extends MongoDBContainer {
  constructor() {
    super(collection, schema);
  }

  async getAll(productId) {
    try {
      if (productId) {
        const product = await super.getAllDataOrById(productId);
        return {singleProduct: true, state: {product, serverStatus: 200}};
      }
      const products = await super.getAllDataOrById();
      return {singleProduct: false, state: {products, serverStatus: 200}};
    } catch (error) {
      throw new Error(error);
    }
  }
  async save(data) {
    if (typeof data === "object") {
      const product = await super.save(data);
      return {state: {message: "Producto creado con exito", product, serverStatus: 200}};
    }

    return {state: {message: "Faltan datos", serverStatus: 400}};
  }

  async updateById(productId, data) {
    const isEmpty = Object.keys(data).length === 0;
    if (productId) {
      switch (isEmpty) {
        case isEmpty:
          const product = await super.updateById(productId, data);
          return {
            product: true,
            state: {
              message: `Se actualizo el producto correctamente`,
              product,
              serverStatus: 200,
            },
          };

        default:
          return {
            product: true,
            state: {
              message: `No se proporciono ningun dato para actualizar`,
              serverStatus: 400,
            },
          };
      }
    }
    return {
      product: false,
      state: {
        message: `No se encontro ningun product para actualizar, no se proporciono un ID`,
        serverStatus: 400,
      },
    };
  }

  async deleteById(productId) {
    if (productId) {
      const product = await super.getAllDataOrById(productId);
      await super.deleteData(productId);
      return {
        state: {message: "Producto eliminado correctamente", product, serverStatus: 200},
      };
    }
    return {state: {message: "No se proporciono ningun id", serverStatus: 400}};
  }
}