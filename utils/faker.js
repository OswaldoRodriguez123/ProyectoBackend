const faker = require("faker");

faker.locale = "es";

const createProductItem = () => ({
  name: faker.commerce.productName(),
  price: faker.commerce.price(100, 5000, 2, "$"),
  thumbnail: faker.image.avatar(),
});

module.exports = {
  createProductItem,
};