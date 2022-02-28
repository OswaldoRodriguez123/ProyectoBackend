import FilesContainer from "../../containers/FilesContainer";

module.exports = class CartDAO extends FilesContainer {
  constructor() {
    super([], "cart", "cart");
  }

  async createCarrito() {
    const cart = {
      id: uuidv4(),
      timeStamp: Date.now(),
      products: [],
    };
    this.data.push(cart);
    await this.saveToJson();
    return cart.id;
  }

  async deleteById(cartId, productId) {
    const {cart, product} = this.dataIndexes(cartId, productId);
    const {cartIndex} = cart;

    switch ((cart, product)) {
      case cart.state && product.state:
        const newList = this.data[cartIndex].products.filter(
          (product) => product.id !== productId
        );
        this.data[cartIndex].products = newList;
        await this.saveToJson();
        return true;
      case cart.state && !product.state:
        return false;

      default:
        return false;
    }
  }

  dataIndexes(cartId, productId) {
    const cartIndex = this.data.findIndex((data) => data.id === cartId);
    if (cartIndex >= 0) {
      const productIndex = this.data[index].products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex >= 0) {
        return {
          cart: {state: true, cartIndex},
          product: {state: true, productIndex},
        };
      }
      return {
        cart: {state: true, cartIndex},
        product: {state: false, productIndex},
      };
    }
    return {
      cart: {state: false, cartIndex},
      product: {state: false, productIndex},
    };
  }
}