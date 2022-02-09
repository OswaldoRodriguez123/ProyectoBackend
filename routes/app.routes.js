const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const routeCart = require('./cart/cart.routes');
const routerProductPrivate = require('./products/private/product.routes');
const routeProductPublic = require('./products/public/product.routes');

const router = express.Router();

router.use("/cart", routeCart);
router.use("/products", routeProductPublic);
router.use("/products", authMiddleware, routerProductPrivate);
router.use("*", (req, res) => {
  res.status(404).json({
    error: -2,
    description: `La ruta ${req.baseUrl} con el metodo ${req.method} no esta implementado`,
  });
});

module.exports = router;
