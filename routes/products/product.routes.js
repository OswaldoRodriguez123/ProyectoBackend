
const express = require('express');
const productController = require('../../controllers/products/product.controller');

const router = express.Router();

router.get('/', productController.getAll);
router.post('/', productController.save);
router.get('/:id', productController.getById);
router.put('/:id', productController.updateById);
router.delete('/:id', productController.deleteById);

module.exports = router;