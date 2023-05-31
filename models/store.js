'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Item, Staff, Order, Unprocessed_ingredient_store, Ingredient_store, Item_store}) {
      this.hasOne(Staff, { foreignKey: "id_store" });
      this.hasOne(Order, { foreignKey: "id_store" });
      this.hasOne(Unprocessed_ingredient_store, { foreignKey: "id_store" });
      this.hasOne(Ingredient_store, { foreignKey: "id_store" });
      this.hasOne(Item_store, { foreignKey: "id_store" });
    }
  }
  Store.init({
    id_store: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    storeLat: {
      type: DataTypes.STRING,
    },
    storeLng: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Store',
    timestamps: false,
  });
  return Store;
};