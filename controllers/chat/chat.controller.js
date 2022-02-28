const { chatDao } = require("../models/dao/index");

const save = async (req, res) => {
  const message = await chatDao.save(req.body);
  res.status(200).json(message);
};

module.exports = {
  save,
};