const express = require('express');
const controller = require("../../../controllers/products/product.controller");

const router = express.Router();

router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
