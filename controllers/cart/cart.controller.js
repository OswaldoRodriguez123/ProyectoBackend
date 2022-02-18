const Cart = require('../../models/cart/cart.model');

const model = new Cart();

const createCart = (req, res) => {
  const id = model.createCart();
  return res.status(200).json({message: `Se creo el carrito con id: ${id}`});
};

const deleteCart = (req, res) => {
  const {id} = req.params;
  if (id) {
    const cart = model.delete(id);
    if (cart) {
      return res
        .status(200)
        .json({message: `Se elimino el carrito con id: ${id}`});
    }
    return res.status(400).json({error: "No se encontro el carrito"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const getAllProducts = (req, res) => {
  const {id} = req.params;
  if (id) {
    const products = model.getAllProducts(id);
    if (products.length > 0) {
      return res.status(200).json(products);
    }
    return res.status(400).json({error: "No se encontraron productos"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const addProductToCart = (req, res) => {
  const {id, productId} = req.params;

  if (id && productId) {
    const product = product.getById(productId);
    if (product) {
      const cart = model.addProduct(id, product);
      if (cart) {
        return res
          .status(200)
          .json({message: `Se agrego el producto con id: ${productId}`});
      }
      return res.status(400).json({error: "No se encontro el carrito"});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

const deleteProduct = (req, res) => {
  const {id, productId} = req.params;
  if (id && productId) {
    const product = model.deleteById(id, productId);
    if (product) {
      return res
        .status(200)
        .json({message: `Se elimino el producto con id: ${productId}`});
    }
    return res.status(400).json({error: "No se encontro el producto"});
  }
  return res.status(400).json({error: "No se proporciono ningun id"});
};

module.exports = {
  createCart,
  deleteCart,
  getAllProducts,
  addProductToCart,
  deleteProduct,
};
