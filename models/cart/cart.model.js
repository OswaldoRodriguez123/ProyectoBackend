const {v4: uuidv4} = require("uuid");
const fs = require("fs/promises");

module.exports = class Cart {
  constructor() {
    this.cart = [];
    this.open();
  }

  open() {
    try {
      const load = async () => {
        const data = await fs.readFile("./data/cart.json", "utf-8");
        this.cart = JSON.parse(data);
      };

      load();
    } catch (error) {
      console.log(error.message);
      this.carts = [];
    }
  }

  save() {
    const cart = {
      id: uuidv4(),
      timeStamp: Date.now(),
      products: [],
    };
    this.cart.push(cart);
    this.saveToJson();
    return cart.id;
  }

  getAllProducts(id) {
    const index = this.cart.findIndex((cart) => cart.id === id);
    if (index >= 0) {
      return this.cart[index].products;
    }
    return [];
  }

  addProduct(id, product) {
    const index = this.cart.findIndex((cart) => cart.id === id);
    if (index >= 0) {
      this.cart[index].products.push(product);
      this.saveToJson();
      return true;
    }
    return;
  }

  delete(id) {
    const index = this.cart.findIndex((cart) => cart.id === id);
    if (index >= 0) {
      const newList = this.cart.filter((cart) => cart.id !== id);
      this.cart = newList;
      this.saveToJson();
      return true;
    }
    return;
  }

  deleteById(id, productId) {
    const index = this.cart.findIndex((cart) => cart.id === id);
    if (index >= 0) {
      const indexProduct = this.cart[index].products.findIndex(
        (product) => product.id === productId
      );
      if (indexProduct >= 0) {
        const newList = this.cart[index].products.filter(
          (product) => product.id !== productId
        );
        this.cart[index].products = newList;
        this.saveToJson();
        return true;
      }
      return false;
    }
    return false;
  }

  async saveToJson() {
    try {
      await fs.writeFile(
        "./data/cart.json",
        JSON.stringify(this.cart, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
