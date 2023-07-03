const { Recipe, Recipe_ingredient } = require("../models");
const { QueryTypes } = require("sequelize");

const createRecipeItem = async (req, res) => {
  const { id_ingredient, id_item, quantity } = req.body;
  console.log(id_ingredient,id_item,quantity)
  try {
    await Recipe.create({
        id_ingredient, id_item, quantity 
    });
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllRecipeItem = async (req, res) => {
  const { id_item } = req.params;
  try {
    const itemList = await Recipe.sequelize.query(
      "SELECT R.*, IG.name FROM recipes as R, items as I, ingredients as IG WHERE R.id_item = I.id_item AND R.id_ingredient = IG.id_ingredient AND I.id_item = :id_item",
      {
        replacements: { id_item },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ itemList });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateRecipeItem = async (req, res) => {
  const { id_ingredient, id_item } = req.params;
  const { quantity } = req.body;
  try {
      await Recipe.sequelize.query(
        "UPDATE recipes SET quantity = :quantity WHERE id_item = :id_item AND id_ingredient = :id_ingredient",
        {
          replacements: { id_item, id_ingredient, quantity },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const deleteRecipeItem = async (req, res) => {
  const { id_ingredient, id_item } = req.params;
  console.log(id_ingredient,id_item)
  try {
      await Recipe.destroy({
        where: {
          id_ingredient,
          id_item,
        },
      });
      res.status(200).json({ message: "Xoá thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getDetailRecipeItem = async (req, res) => {
  const { id_ingredient, id_item } = req.params;
  try {
    const item = await Recipe.findOne({
      where: {
        id_ingredient,
        id_item
      }
    })
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createRecipeIngredient = async (req, res) => {
  const { id_ingredient, id_u_ingredient, quantity } = req.body;
  try {
    await Recipe_ingredient.create({
        id_ingredient, id_u_ingredient, quantity 
    });
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllRecipeIngredient = async (req, res) => {
  const { id_ingredient } = req.params;
  try {
    const itemList = await Recipe.sequelize.query(
      "SELECT RI.*, UI.name FROM recipe_ingredients as RI, ingredients as IG, unprocessed_ingredients as UI WHERE UI.id_u_ingredient = RI.id_u_ingredient AND RI.id_ingredient = IG.id_ingredient AND IG.id_ingredient = :id_ingredient",
      {
        replacements: { id_ingredient },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ itemList });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateRecipeIngredient = async (req, res) => {
  const { id_ingredient, id_u_ingredient } = req.params;
  const { quantity } = req.body;
  try {
      await Recipe_ingredient.sequelize.query(
        "UPDATE recipe_ingredients SET quantity = :quantity WHERE id_u_ingredient = :id_u_ingredient AND id_ingredient = :id_ingredient",
        {
          replacements: { id_u_ingredient, id_ingredient, quantity },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const deleteRecipeIngredient = async (req, res) => {
  const { id_ingredient, id_u_ingredient } = req.params;
  try {
      await Recipe_ingredient.destroy({
        where: {
          id_ingredient,
          id_u_ingredient,
        },
      });
      res.status(200).json({ message: "Xoá thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getDetailRecipeIngredient = async (req, res) => {
  const { id_ingredient, id_u_ingredient } = req.params;
  try {
    const item = await Recipe_ingredient.findOne({
      where: {
        id_ingredient,
        id_u_ingredient
      }
    })
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
    createRecipeItem,
    updateRecipeItem,
    deleteRecipeItem,
    getDetailRecipeItem,
    createRecipeIngredient,
    updateRecipeIngredient,
    deleteRecipeIngredient,
    getDetailRecipeIngredient,
    getAllRecipeItem,
    getAllRecipeIngredient,
};
