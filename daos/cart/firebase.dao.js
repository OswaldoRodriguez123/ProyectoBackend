import FireBaseContainter from "../../containers/FireBaseContainer.js";

module.exports = class cartDAO extends FireBaseContainter {
  constructor() {
    super("cart");
  }

  async save(cart = {products: []}) {
    try {
      const cartData = await super.save(cart);

      return {
        result: true,
        state: {message: `Se creo el carrito con exito`, cartData, serverStatus: 200},
      };
    } catch (error) {
      throw new Error(`No se pudo crear el carrito: ${error}`);
    }
  }

  async addProduct(cartId, productId, product) {
    try {
      const cart = await super.getById(cartId);

      switch ((cart, product)) {
        case cart && product:
          cart.products.push(product);
          await super.updateById(cartId, cart);
          return {
            cart: true,
            product: true,
            state: {
              message: "Producto agregado exitosamente al carrito",
              cartId,
              product,
              serverStatus: 201,
            },
          };
        case cart && !product:
          return {
            cart: true,
            product: false,
            state: {
              message: "No se encontro el producto",
              cartId,
              productId,
              serverStatus: 201,
            },
          };
        default:
          return {
            cart: false,
            product: false,
            state: {
              message: "No se encontro el carrito y el producto",
              cartId,
              productId,
              serverStatus: 204,
            },
          };
      }
    } catch (error) {
      throw new Error(`No se pudo agregar el producto: ${error}`);
    }
  }

  async deleteById(cartId) {
    try {
      const cart = await super.getById(cartId);
      switch ((cartId, cart)) {
        case cartId && cart:
          await super.deleteById(cartId);
          return {
            cart: true,
            state: {
              message: `Se elimino el carrito correctamente`,
              cartId,
              serverStatus: 200,
            },
          };
        case cartId && !cart:
          return {
            cart: false,
            state: {message: `No se encontro el carrito`, cartId, serverStatus: 404},
          };
        default:
          return {
            cart: false,
            state: {message: `No se proporciono ningun id`, cartId, serverStatus: 400},
          };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProducts(cartId) {
    try {
      if (cartId) {
        const {products = []} = await super.getById(cartId);

        return {
          products: true,
          state: {
            message:
              products.length > 0
                ? "Se obtuvieron todos los productos del carrito"
                : "No hay products dentro del carrito",
            cartId,
            products,
            serverStatus: 200,
          },
        };
      }

      return {
        products: false,
        state: {
          message: "Se debe proporcionar un id de carrito",
          cartId: null,
          serverStatus: 400,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductCart(cartId, productId) {
    try {
      const cart = await super.getById(cartId);

      const index = cart.products.findIndex((data) => data.id === productId);
      console.log(index);

      if (index >= 0) {
        const newList = cart.products.splice(index, 1);
        const dataUpdated = await super.updateById(cartId, {
          ...cart,
          products: newList,
        });
        return {
          cart: true,
          product: true,
          state: {
            message: "Producto eliminado exitosamente del carrito",
            cartId,
            productEliminado: cart.products[index],
            dataUpdated,
            serverStatus: 201,
          },
        };
      }
      return {
        cart: true,
        product: false,
        state: {
          message: "No se encontro el producto",
          cartId,
          productId,
          serverStatus: 200,
        },
      };
    } catch (error) {
      throw new Error(` ${error}`);
    }
  }
}