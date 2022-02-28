const { DATABASE } = require('../config/index');
let Product;
let Cart;

(async function () {
    let type = DATABASE.toLowerCase();
    if (!type) type = "file";
    let ProductDAO = await require(`./products/${type}.dao`);
    let CartDAO = await require(`./cart/${type}.dao`);
    Product = new ProductDAO();
    Cart = new CartDAO();
})();

module.exports = { Product, Cart };