const express = require('express');
const controller = require("../../controllers/products/product.controller");

const router = express.Router();

router.get("/", controller.mockAll);

module.exports = router;
