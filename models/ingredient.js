'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Import_invoice_detail, Export_invoice_detail, Recipe, Ingredient_store}) {
      this.hasOne(Import_invoice_detail, { foreignKey: "id_ingredient" });
      this.hasOne(Export_invoice_detail, { foreignKey: "id_ingredient" });
      this.hasOne(Recipe, { foreignKey: "id_ingredient" });
      this.hasOne(Ingredient_store, { foreignKey: "id_ingredient" });
      // define association here
    }
  }
  Ingredient.init({
    id_ingredient: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
    timestamps: false
  });
  return Ingredient;
};