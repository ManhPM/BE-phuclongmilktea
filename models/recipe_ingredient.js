'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Unprocessed_ingredient, Ingredient, Store}) {
      this.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
      this.belongsTo(Unprocessed_ingredient, { foreignKey: "id_u_ingredient" });
    }
  }
  Recipe_ingredient.init({
    id_u_ingredient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_ingredient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Recipe_ingredient',
    timestamps: false
  });
  return Recipe_ingredient;
};