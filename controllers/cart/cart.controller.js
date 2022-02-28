const { Product: modelProduct } = require("../../daos/index");
const { Cart: modelCart } = require("../../daos/index");

const save = async (req, res, next) => {
  try {
    const {state} = await modelCart.save();
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const addProductToCart = async (req, res, next) => {
  try {
    const {cartId, productId} = req.params;

    if (cartId && productId) {
      const dataProduct = await modelProduct.getAllDataOrById(productId);
      console.log(dataProduct);

      const {state} = await modelCart.addProduct(cartId, productId, dataProduct);

      return res.status(state.serverStatus).json({...state});
    }
    return res.status(400).json({error: "Falta algun ID", cartId, productId});
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const {cartId} = req.params;
    const {state} = await modelCart.deleteById(cartId);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const getAllProductsFromCart = async (req, res, next) => {
  try {
    const {cartId} = req.params;
    const {state} = await modelCart.getAllProducts(cartId);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const deleteProductFromCart = async (req, res, next) => {
  try {
    const {cartId, productId} = req.params;

    const {state} = await modelCart.deleteProductCart(cartId, productId);

    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  save,
  deleteById,
  getAllProductsFromCart,
  addProductToCart,
  deleteProductFromCart,
};