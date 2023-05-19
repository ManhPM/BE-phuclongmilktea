'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unprocessed_ingredient_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Unprocessed_ingredient, Store}) {
      this.belongsTo(Unprocessed_ingredient, { foreignKey: "id_u_ingredient" });
      this.belongsTo(Store, { foreignKey: "id_store" });
      // define association here
    }
  }
  Unprocessed_ingredient_store.init({
    id_store: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_u_ingredient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unprocessed_ingredient_store',
    timestamps: false,
  });
  return Unprocessed_ingredient_store;
};