const express = require('express');
const controller = require("../../controllers/cart/cart.controller");

const router = express.Router();

router.post("/", controller.save);
router.delete("/:id?", controller.deleteById);
router.delete("/:id?/products/:productId", controller.deleteById);
router.get("/:id?/products", controller.getAllProductsFromCart);
router.post("/:id?/products/:productId", controller.addProductToCart);

module.exports = router;
