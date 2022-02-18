const Mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = require('../config/index');

const connectMongoDB = async () => {
  try {
    await Mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectMongoDB;