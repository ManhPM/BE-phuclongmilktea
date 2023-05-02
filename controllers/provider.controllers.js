const { Provider } = require("../models");

const getAllProvider = async (req, res) => {
  try {
    const prodiverList = await Provider.findAll({});
    res.status(201).json({prodiverList});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllProvider,
};
