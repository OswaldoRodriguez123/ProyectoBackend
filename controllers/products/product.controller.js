// const Product = require("../../models/products/product.model");
const Product = require("../../daos/products/product.dao");
const model = new Product("products");

const getAll = async (req, res) => {
  const products = await model.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const {id} = req.params;
  const product = await model.getById(id);
  if (product) {
    return res.status(200).json(product);
  }

  return res.status(404).json({error: "Producto no encontrado"});
};

const save = async (req, res) => {
  const {name, price, thumbnail} = req.body;
  if (name && price && thumbnail) {
    await model.save({name, price, thumbnail});

    return res.status(200).redirect("/");
  }

  return res.status(400).send("Faltan datos");
};

const updateById = async (req, res) => {
  const {id} = req.params;
  const {name, price, thumbnail} = req.body;

  if (name && price && thumbnail) {
    const result = model.updateProduct(id, { name, price, thumbnail });
    if (result) {
      return res.status(200).send("Producto actualizado");
    }
    return res.status(404).send("Producto no encontrado");
  }

  return res.status(400).send("Faltan datos");
};

const deleteById = async (req, res) => {
  const {id} = req.params;

  if (id) {
    const result = await model.deleteProduct(id);

    if (result) {
      return res.status(200).json({message: "Producto eliminado"});
    }
    return res.status(404).json({message: "Producto no encontrado"});
  }

  return res.status(404).json({message: "Se debe proporcionar un id"});
};

module.exports = {
  getAll,
  getById,
  save,
  updateById,
  deleteById,
};
