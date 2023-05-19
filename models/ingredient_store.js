'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Ingredient, Store}) {
      this.belongsTo(Ingredient, { foreignKey: "id_ingredient" });
      this.belongsTo(Store, { foreignKey: "id_store" });
      // define association here
    }
  }
  Ingredient_store.init({
    id_store: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_ingredient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient_store',
    timestamps: false,
  });
  return Ingredient_store;
};