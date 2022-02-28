const { productDAO: model } = require("../../daos/index.js");
const ProductMock = require("../../mocks/products/product.mock");
const mock = new ProductMock("producto");

const mockAll = (req, res, next) => {
  const products = mock.populate(5);
  res.status(200).json(products);
};

const getAll = async (req, res, next) => {
  try {
    const {state} = await model.getAll();

    res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {state} = await model.getAll(id);

    res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const save = async (req, res, next) => {
  try {
    const {state} = await model.addProduct(req.body);

    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const {productId} = req.params;
    const {state} = await model.updateById(productId, req.body);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const {productId} = req.params;
    const {state} = await model.deleteById(productId);
    return res.status(state.serverStatus).json({...state});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  mockAll,
  getAll,
  getById,
  save,
  updateById,
  deleteById,
};