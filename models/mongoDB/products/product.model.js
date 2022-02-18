const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;
const collection = "productos";

const schema = new Schema({
  id: Mongoose.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const model = Mongoose.model(collection, schema);

module.exports = model;