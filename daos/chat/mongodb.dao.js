const Mongoose = require("mongoose");
const MongoDBContainer = require("../../models/containers/mongodb.container");

const chatSchema = new Mongoose.Schema({
  author: {type: Object, required: true},
  message: {type: String, required: true},
  timeStamp: {type: Date, default: Date.now},
});

class ChatDaoMongoDB extends MongoDBContainer {
  constructor() {
    super("chat", chatSchema);
  }
}

module.exports = ChatDaoMongoDB;