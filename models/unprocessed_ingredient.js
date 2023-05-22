'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unprocessed_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Import_invoice_detail, Export_invoice_detail, Recipe_ingredient, Unprocessed_ingredient_store}) {
      this.hasOne(Import_invoice_detail, { foreignKey: "id_u_ingredient" });
      this.hasOne(Export_invoice_detail, { foreignKey: "id_u_ingredient" });
      this.hasOne(Unprocessed_ingredient_store, { foreignKey: "id_u_ingredient" });
      this.hasOne(Recipe_ingredient, { foreignKey: "id_u_ingredient" });
      // define association here
    }
  }
  Unprocessed_ingredient.init({
    id_u_ingredient: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    unit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Unprocessed_ingredient',
    timestamps: false
  });
  return Unprocessed_ingredient;
};