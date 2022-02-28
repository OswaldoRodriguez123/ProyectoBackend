import {v4 as uuidv4} from "uuid";
import fs from "fs/promises";

module.exports = class FilesContainer {
  /**
   * FileContainer for data
   * @constructs FilesContainer
   * @param {(Object | Object[])} dataType - Type of data to work with
   * @param {String} fileName - The fileName the JSON will be stored
   * @param {String} context - The context , products or cart.
   */
  constructor(dataType, fileName, context) {
    this.data = dataType;
    this.fileName = fileName.toLowerCase().trim();
    this.context = context.toLowerCase().trim();
    this.open();
  }

  open() {
    try {
      const load = async () => {
        const data = await fs.readFile(`./data/${this.fileName}.json`, "utf-8");
        this.data = JSON.parse(data);
      };

      load();
    } catch (error) {
      this.data = [];
      console.log(error);
    }
  }

  async save(itemData) {
    try {
      switch (this.context) {
        case "cart":
          //Armar esta funcion para que se corresponda con cart Controller
          const index = this.data.findIndex((cart) => cart.id === id);
          if (index >= 0) {
            this.data[index].products.push(product);
            this.saveToJson();
            return true;
          }
          return;
        case "products":
          const itemComplete = {id: uuidv4(), timeStamp: Date.now(), ...itemData};
          this.data.push(itemComplete);
          await this.saveToJson();
          return itemComplete;

        default:
          this.data = this.data;
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  getAll(id) {
    try {
      switch (this.context) {
        case "cart":
          const index = id && this.cart.findIndex((cart) => cart.id === id);
          return !index && index >= 0 ? this.data[index].products : this.data;
        case "products":
          const item = id && this.data.find((product) => product.id === id);
          return !item ? this.data : item;
        default:
          break;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateById(id, product) {
    try {
      switch (this.context) {
        case "cart":
          const index = this.data.findIndex((data) => data.id === id);
          if (index >= 0) {
            this.data[index].products.push(product);
            await this.saveToJson();
            return true;
          }
          break;
        case "products":
          const index = this.data.findIndex((product) => product.id === id);
          if (index >= 0) {
            this.data[index] = {id, ...product};
            await this.saveToJson();
            return this.data[index];
          }
          break;
        default:
          console.error("No se encontro ningun indice");
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteById(id) {
    try {
      const index = this.data.findIndex((data) => data.id === id);
      if (index >= 0) {
        const newList = this.data.filter((data) => data.id !== id);
        this.data = newList;
        await this.saveToJson();
        return true;
      }
      return;
    } catch (error) {
      console.error(error.message);
    }
  }

  async saveToJson() {
    try {
      await fs.writeFile(
        `./data/${this.fileName}.json`,
        JSON.stringify(this.data, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}