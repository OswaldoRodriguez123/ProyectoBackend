const { DATABASE } = require('../config/index');
let Product;
let Cart;
let Chat;

(async function () {
    let type = DATABASE.toLowerCase();
    if (!type) type = "file";
    let ProductDAO = await require(`./products/${type}.dao`);
    let CartDAO = await require(`./cart/${type}.dao`);
    let ChatDAO = await require(`./chat/${type}.dao`);
    Product = new ProductDAO();
    Cart = new CartDAO();
    Chat = new ChatDAO();
})();

module.exports = { Product, Cart };