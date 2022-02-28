import FireBaseContainter from "../../containers/FireBaseContainer.js";

class productDAO extends FireBaseContainter {
  constructor() {
    super("products");
  }

  async getAll(productId) {
    try {
      if (productId) {
        const product = await super.getAllDataOrById(productId);
        return {
          singleProduct: true,
          state: {
            message: "Producto encontrado exitosamente",
            productId,
            product,
            serverStatus: 200,
          },
        };
      }
      const products = await super.getAllDataOrById();
      return {
        singleProduct: false,
        state: {
          message: "Se encontraron todos los products de la coleccion",

          products,
          serverStatus: 200,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(data) {
    const objectKeys = Object.keys(data);
    if (typeof data === "object" && objectKeys.length === 6) {
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
              message: `Se actualizo el product correctamente`,
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
        message: `No se encontro ningun producto para actualizar, no se proporciono un ID`,
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

module.exports = productDAO;