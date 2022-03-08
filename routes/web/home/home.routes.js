const express = require("express");
const path = require("path");
const { webAuth } = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/public/pages/index.hbs"), {
    nombre: req.session.nombre,
  });
});

router.get("/productos-test", webAuth, (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/productos-test.html"));
});

module.exports = router;