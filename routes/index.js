const express = require('express');
const router = express.Router();

router.use('/productos', require('./products.routes'));

module.exports = router;