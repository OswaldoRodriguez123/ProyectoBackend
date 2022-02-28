const {normalize, schema} = require("normalizr");

const getNormalizedData = (data) => {
  const dataJson = JSON.stringify(data);
  const dataParsed = JSON.parse(dataJson);

  const schemaAuthor = new schema.Entity("author", {}, {idAttribute: "id"});
  const schemaMessage = new schema.Entity("post", {author: schemaAuthor});
  const schemaMessages = new schema.Entity(
    "posts",
    {messages: [schemaMessage]},
    {idAttribute: "messages"}
  );

  const normalizedData = normalize(
    {id: "messages", messages: dataParsed},
    schemaMessages
  );

  return normalizedData;
};


module.exports = getNormalizedData;