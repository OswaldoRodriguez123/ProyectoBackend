const Product = require('../../models/products/product.model');
const product = new Product();

// exports.save = async (req, res) => {
//     const data = req.body;
//     res.json(await product.save(data));
// }

exports.save = async (req, res) => {
    const data = req.body;
    await product.save(data);
    return res.status(200).redirect("/productos");
};

exports.getAll = async (req, res) => {
    res.json(await product.getAll())
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    res.json(await product.getById(id));
}

exports.updateById = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.json(await product.updateById(id, data));
}

exports.deleteById = async (req, res) => {
    const id = req.params.id;
    res.json(await product.deleteById(id));
}