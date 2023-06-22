const { Recipe, Recipe_ingredient } = require("../models");
const { QueryTypes } = require("sequelize");

const createRecipe = async (req, res) => {
  const { id_ingredient, id_item, quantity } = req.body;
  try {
    await Recipe.create({
        id_ingredient, id_item, quantity 
    });
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllRecipeOfItem = async (req, res) => {
  const { id_item } = req.params;
  try {
    const item = await Recipe.findAll({
      where: {
        id_item
      }
    })
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateRecipe = async (req, res) => {
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

const deleteRecipe = async (req, res) => {
  const { id_ingredient, id_item } = req.params;
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

const getDetailRecipe = async (req, res) => {
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

const getAllRecipeOfIngredient = async (req, res) => {
  const { id_ingredient } = req.params;
  try {
    const item = await Recipe_ingredient.findAll({
      where: {
        id_ingredient
      }
    })
    res.status(200).json({ item });
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
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getDetailRecipe,
    createRecipeIngredient,
    updateRecipeIngredient,
    deleteRecipeIngredient,
    getDetailRecipeIngredient
};
