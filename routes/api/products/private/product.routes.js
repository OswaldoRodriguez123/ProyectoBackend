const express = require('express');
const controller = require("../../../../controllers/products/product.controller");

const router = express.Router();

router.post("/", controller.save);
router.put("/:id", controller.updateById);
router.delete("/:id", controller.deleteById);

module.exports = router;
