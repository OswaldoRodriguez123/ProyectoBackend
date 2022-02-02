const userAdmin = true;

exports.authMiddleware = (req, res, next) => {
  userAdmin
    ? next()
    : res.status(401).json({
        error: -1,
        descripcion: `No tienes permisos para acceder a la ruta ${req.baseUrl} con el método ${req.method}`,
      });
};
