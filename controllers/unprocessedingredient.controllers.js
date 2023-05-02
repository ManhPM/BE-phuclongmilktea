const { Unprocessed_ingredient } = require("../models");

const getAllUnprocessedIngredient = async (req, res) => {
  try {
    const itemList = await Unprocessed_ingredient.findAll({});
    res.status(201).json({itemList});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllUnprocessedIngredient,
};
