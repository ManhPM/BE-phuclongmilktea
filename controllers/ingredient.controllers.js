const { Ingredient, Staff } = require("../models");
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
    const staff = await Ingredient.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const ingredientList = await Ingredient.sequelize.query(
      "SELECT R.id_u_ingredient, R.id_ingredient, IG.unit, IG.name as name_ingredient, (R.quantity*(:quantity)) as totalquantity, (SELECT quantity FROM unprocessed_ingredient_stores WHERE id_u_ingredient = R.id_u_ingredient AND id_store = :id_store) as quantity FROM recipe_ingredients as R, unprocessed_ingredients as IG WHERE R.id_ingredient = :id_ingredient AND IG.id_u_ingredient = R.id_u_ingredient",
      {
        replacements: { id_ingredient: id_ingredient, quantity: quantity, id_store: staff[0].id_store },
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
          "UPDATE unprocessed_ingredient_stores SET quantity = quantity - (:quantity) WHERE id_u_ingredient = :id_u_ingredient AND id_store = :id_store",
          {
            replacements: { id_u_ingredient: ingredientList[j].id_u_ingredient, quantity: ingredientList[j].totalquantity, id_store: staff[0].id_store },
            type: QueryTypes.UPDATE,
            raw: true,
          }
        );
        j++;
      }
      await Ingredient.sequelize.query(
        "UPDATE ingredient_stores SET quantity = quantity + (:quantity) WHERE id_ingredient = :id_ingredient AND id_store = :id_store",
        {
          replacements: { quantity: quantity, id_ingredient: id_ingredient, id_store: staff[0].id_store },
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
