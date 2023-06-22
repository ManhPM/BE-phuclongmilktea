const { Unprocessed_ingredient } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllUnprocessedIngredient = async (req, res) => {
  try {
    const totalItems = await Unprocessed_ingredient.sequelize.query(
      "SELECT COUNT(*) as total FROM unprocessed_ingredients",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemList = await Unprocessed_ingredient.findAll({});
    res.status(201).json({totalItems: totalItems[0].total, itemList});
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createUnprocessedIngredient= async (req, res) => {
  const {name, unit} = req.body
  try {
    await Unprocessed_ingredient.create({
      name,
      unit,
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

const getDetailUnprocessedIngredient = async (req, res) => {
  const {id_u_ingredient} = req.params
  try {
    const item = await Unprocessed_ingredient.findOne({
      where: {
        id_u_ingredient
      }
    });
    res.status(200).json({item});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};


module.exports = {
    getAllUnprocessedIngredient,
    createUnprocessedIngredient,
    updateUnprocessedIngredient,
    getDetailUnprocessedIngredient
};
