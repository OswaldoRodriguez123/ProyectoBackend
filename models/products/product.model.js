const configMariaDB = require("../../database/configMariaDB");
class Product {
  constructor(tableName) {
    this.knex = require("knex")(configMariaDB);
    this.tableName = tableName;
    this.open();
  }

  open() {
    this.knex.schema.hasTable(this.tableName).then((exists) => {
      if (!exists) {
        this.knex.schema
          .createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("name");
            table.integer("price");
            table.string("thumbnail");
          })
          .then(() => {
            console.log("Tabla creada");
          })
          .catch((err) => console.log(err));
      }
    });
  }

  async getAll() {
    try {
      const result = await this.knex.from(this.tableName).select("*");
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(id) {
    try {
      const result = await this.knex.from(this.tableName).select("*").where("id", id);
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async save(product) {
    try {
      await this.knex(this.tableName).insert(product);
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateProduct(id, product) {
    try {
      await this.knex(this.tableName).where("id", id).update(product);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async deleteProduct(id) {
    try {
      await this.knex(this.tableName).where("id", id).del();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = Product;
