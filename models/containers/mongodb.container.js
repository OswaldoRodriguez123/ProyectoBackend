const Mongoose = require("mongoose");
const { MONGO_URI } = require('../../config/index');

(async function () {
  await Mongoose.connect(MONGO_URI);
})();

class MongoDBContainer {
  constructor(collection, schema) {
    this.model = Mongoose.model(collection, schema);
  }

  async save(data) {
    try {
      const dataComplete = {timeStamp: Date.now(), ...data};
      return await this.model.create(dataComplete);
    } catch (error) {
      throw new Error(`No se pudo guardar: ${error}`);
    }
  }

  async getAll(id) {
    try {
      if (id) {
        const result = await this.model.findById(id);

        if (!result) {
          throw new Error(
            `No se encontro el documento con id: ${id}. En su lugar se obtuvo ${result}`
          );
        }
        return result;
      }
      return await this.model.find({});
    } catch (error) {
      throw new Error(`Error al obtener todos los datos: ${error}`);
    }
  }

  async updateById(id, data) {
    try {
      const dataUpdate = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!dataUpdate) {
        throw new Error(`No se encontro información con id: ${id}`);
      }
      return dataUpdate;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`No se pudo eliminar: ${error}`);
    }
  }
}

module.exports = MongoDBContainer;