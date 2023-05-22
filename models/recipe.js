'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Ingredient, Item, Store}) {
      this.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
      this.belongsTo(Item, { foreignKey: "id_item" });
    }
  }
  Recipe.init({
    id_ingredient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: false
  });
  return Recipe;
};