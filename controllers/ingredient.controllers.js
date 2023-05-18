const { Ingredient } = require("../models");
const { QueryTypes } = require("sequelize");

const createIngredient = async (req, res) => {
  const {name, unit} = req.body
  try {
    await Ingredient.create({
      name,
      unit,
      quantity: 0
    });
    res.status(200).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateIngredient = async (req, res) => {
  const {id_ingredient} = req.params
  const {name, unit} = req.body
  try {
    const update = await Ingredient.findOne({
      where: {
        id_ingredient
      }
    });
    update.name = name
    update.unit = unit
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const getAllIngredient = async (req, res) => {
  try {
    const itemList = await Ingredient.findAll({});
    res.status(201).json({itemList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const processingIngredient = async (req, res) => {
  const {id_ingredient} = req.params
  const {quantity} = req.body
  try {
    const ingredientList = await Ingredient.sequelize.query(
      "SELECT UI.name as name_u_ingredient, UI.unit, RI.id_u_ingredient, RI.id_ingredient, RI.quantity*(:quantity) as totalquantity, UI.quantity FROM recipe_ingredients as RI, unprocessed_ingredients as UI WHERE RI.id_ingredient = :id_ingredient AND RI.id_u_ingredient = UI.id_u_ingredient",
      {
        replacements: { id_ingredient: id_ingredient, quantity: quantity },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    let i = 0;
    let isEnough = 1;
    while(ingredientList[i]){
      if(ingredientList[i].totalquantity >= ingredientList[i].quantity){
        isEnough = 0;
        break;
      }
      else {
        i++;
      }
    }
    if(isEnough == 1){
      let j = 0;
      while(ingredientList[j]){
        await Ingredient.sequelize.query(
          "UPDATE unprocessed_ingredients SET quantity = quantity - (:quantity) WHERE id_u_ingredient = :id_u_ingredient",
          {
            replacements: { id_u_ingredient: ingredientList[j].id_u_ingredient, quantity: ingredientList[j].totalquantity },
            type: QueryTypes.UPDATE,
            raw: true,
          }
        );
        j++;
      }
      await Ingredient.sequelize.query(
        "UPDATE ingredients SET quantity = quantity + (:quantity) WHERE id_ingredient = :id_ingredient ",
        {
          replacements: { quantity: quantity, id_ingredient: id_ingredient },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(201).json({ingredientList});
    }
    else {
      res.status(401).json({message: "Số lượng nguyên liệu không đủ!"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllIngredient,
    processingIngredient,
    createIngredient,
    updateIngredient
};
