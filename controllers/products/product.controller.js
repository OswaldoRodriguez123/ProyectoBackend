const Product = require('../../models/products/product.model');

const model = new Product();

const getAllProducts = async (req, res) => {
  const {id} = req.params;

  if (id) {
    const product = await model.getAllOrById(id);
    return res.status(200).json(product);
  }
  const products = await model.getAllOrById();
  return res.status(200).json(products);
};

const addProduct = async (req, res) => {
  const {name, description, code, thumbnail, price, stock} = req.body;

  if (name && description && code && thumbnail && price && stock) {
    const product = await model.save({
      name,
      description,
      code,
      thumbnail,
      price,
      stock,
    });
    return res.status(200).json(product);
  }

  return res.status(400).json({error: "Faltan datos"});
};

const updateProduct = (req, res) => {
  const {id} = req.params;
  const {name, description, code, thumbnail, price, stock} = req.body;

  if (name || description || code || thumbnail || price || stock) {
    const product = model.updateById(id, {
      name,
      description,
      code,
      thumbnail,
      price,
      stock,
    });
    return res
      .status(200)
      .json({message: `Se actualizo con los siguientes datos: ${product}`});
  }
  return res.status(400).json({error: "No se proporciono ningun dato"});
};

const deleteProduct = (req, res) => {
  const {id} = req.params;
  if (id) {
    const product = model.deleteById(id);
    if (product) {
      return res
        .status(200)
        .json({message: `Se elimino el producto con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
