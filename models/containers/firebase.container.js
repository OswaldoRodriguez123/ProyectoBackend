import configDataBase from "../../config/configDataBase.js";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(configDataBase.fireBase),
});
const db = admin.firestore();

class FireBaseContainter {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  async getAll() {
    try {
      const result = [];
      const allDocsReference = await this.collection.get();

      allDocsReference.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()});
      });
      return result;
    } catch (error) {
      throw new Error(`Error al obtener todos los datos: ${error}`);
    }
  }

  async getById(id) {
    try {
      if (id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
          throw new Error(`Error al listar por id: no se encontró`);
        } else {
          const data = doc.data();
          return {...data, id};
        }
      }
    } catch (error) {
      throw new Error(`Error al obtener todos los datos: ${error}`);
    }
  }

  async save(item) {
    try {
      const itemComplete = {
        timeStamp: Date.now(),
        ...item,
      };
      const success = await this.collection.add(itemComplete);
      return {...itemComplete, id: success.id};
    } catch (error) {
      throw new Error(`Error al guardar el item: ${error}`);
    }
  }

  async updateById(id, item) {
    try {
      const writeTime = await this.collection.doc(id).update(item);
      return {...item, writeTime};
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }
  async deleteById(id) {
    try {
      const document = await this.collection.doc(id);
      const timeDeleted = await document.delete();
      return {...document, timeDeleted};
    } catch (error) {
      throw new Error(`Error al borrar el item: ${error}`);
    }
  }
}

module.exports = FireBaseContainter;