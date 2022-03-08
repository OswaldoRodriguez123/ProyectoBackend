const express = require('express');

const routeAuth = require('./auth/auth.routes');
const routeHome = require('./home/home.routes');

const router = express.Router();

router.use("/home", routeHome);
router.use("/auth", routeAuth);

module.exports = router;