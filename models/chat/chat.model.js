const configSQLite = require("../../database/configSQLite");
const knex = require("knex");

class Chat {
  constructor(tableName) {
    this.knex = knex(configSQLite);
    this.tableName = tableName;
    this.open();
  }

  open() {
    this.knex.schema.hasTable(this.tableName).then((exists) => {
      if (!exists) {
        this.knex.schema
          .createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("year");
            table.string("email");
            table.integer("time");
            table.string("message");
          })
          .then(() => {
            console.log("Tabla creada");
          })
          .catch((err) => console.log(err));
      }
    });
  }
  async addMessage(message) {
    try {
      const result = await this.knex(this.tableName).insert(message);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getMessage() {
    try {
      const result = await this.knex.from(this.tableName).select("*");
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
}
module.exports = Chat;
