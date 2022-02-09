const options = {
  client: "better-sqlite3",
  connection: {
    filename: "./database/chat.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = options;
