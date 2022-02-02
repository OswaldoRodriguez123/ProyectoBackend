const {v4: uuidv4} = require("uuid");
const fs = require("fs/promises");

module.exports = class Product {
  constructor() {
    this.products = [];
    this.load();
  }

  load() {
    try {
      const load = async () => {
        const data = await fs.readFile("./data/products.json", "utf-8");
        this.products = JSON.parse(data);
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.products = [];
    }
  }

  getAllOrById(id) {
    if (id) {
      return this.products.find((product) => product.id === id);
    }
    return this.products;
  }
  save(product) {
    const itemComplete = {id: uuidv4(), timeStamp: Date.now(), ...product};
    this.products.push(itemComplete);
    this.saveToJson();

    return itemComplete;
  }

  updateById(id, product) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = {id, ...product};

    this.saveToJson();
  }

  deleteById(id) {
    const productExist = this.products.includes((product) => product.id === id);
    console.log(this.products);

    if (productExist) {
      const newList = this.products.filter((product) => product.id !== id);
      this.products = newList;
      this.saveToJson();
      return true;
    }
    return;
  }

  saveToJson() {
    const save = async () => {
      await fs.writeFile("./data/products.json", JSON.stringify(this.products), null, 2);
    };
    save();
  }
}
