const express = require('express');
const router = express.Router();

router.use('/productos', require('./products/product.routes'));

module.exports = router;