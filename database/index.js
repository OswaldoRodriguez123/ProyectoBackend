const connectMongoDB = require('./configMongoDB');

class DB {
  connect(database) {
    switch (database) {
      case "mongodb":
        connectMongoDB();
        break;

      default:
        console.log("No database selected");
        break;
    }
    console.log(`Database connected`);
  }
}

module.exports = DB;