const express = require('express');
const controller = require("../../controllers/cart/cart.controller");

const router = express.Router();

router.post("/", controller.createCart);
router.delete("/:id?", controller.deleteCart);
router.delete("/:id?/products/:productId", controller.deleteProduct);
router.get("/:id?/products", controller.getAllProducts);
router.post("/:id?/products/:productId", controller.addProductToCart);

module.exports = router;
