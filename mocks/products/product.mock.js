const { createProductItem } = require("../../utils/faker");

class ProductMock {
  constructor(resource) {
    this.resource = resource;
  }

  populate(qty = 50) {
    const mockedItems = [];
    for (let i = 1; i <= qty; i++) {
      const newItem = this.createItem(this.resource);

      mockedItems.push(newItem);
    }
    return mockedItems;
  }

  createItem(resource) {
    const newItems = {
      producto: createProductItem(),
    };
    return newItems[resource];
  }
}

module.exports = ProductMock;