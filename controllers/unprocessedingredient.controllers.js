const { Unprocessed_ingredient } = require("../models");

const getAllUnprocessedIngredient = async (req, res) => {
  try {
    const itemList = await Unprocessed_ingredient.findAll({});
    res.status(201).json({itemList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUnprocessedIngredient= async (req, res) => {
  const {name, unit} = req.body
  try {
    await Unprocessed_ingredient.create({
      name,
      unit,
      quantity: 0
    });
    res.status(200).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateUnprocessedIngredient= async (req, res) => {
  const {id_u_ingredient} = req.params
  const {name, unit} = req.body
  try {
    const update = await Unprocessed_ingredient.findOne({
      where: {
        id_u_ingredient
      }
    })
    update.name = name
    update.unit = unit
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};


module.exports = {
    getAllUnprocessedIngredient,
    createUnprocessedIngredient,
    updateUnprocessedIngredient
};
