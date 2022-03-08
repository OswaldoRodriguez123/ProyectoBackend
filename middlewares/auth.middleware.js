const userAdmin = true;

const routeAuth = (req, res, next) => {
  userAdmin
    ? next()
    : res.status(401).json({
        error: -1,
        descripcion: `No tienes permisos para acceder a la ruta ${req.baseUrl} con el método ${req.method}`,
      });
};

const webAuth = (req, res, next) => {
  if (req.session?.nombre) {
    next();
  } else {
    res.redirect("/login");
  }
}

const apiAuth = (req, res, next) => {
  if (req.session?.nombre) {
    next();
  } else {
    res.status(401).json({error: "no autorizado!"});
  }
}

module.exports = { routeAuth, webAuth, apiAuth };