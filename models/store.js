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
    static associate({Item, Staff, Unprocessed_ingredient, Ingredient, Order, Storage}) {
      this.hasOne(Item, { foreignKey: "id_store" });
      this.hasOne(Unprocessed_ingredient, { foreignKey: "id_store" });
      this.hasOne(Staff, { foreignKey: "id_store" });
      this.hasOne(Ingredient, { foreignKey: "id_store" });
      this.hasOne(Order, { foreignKey: "id_store" });
      this.hasOne(Storage, { foreignKey: "id_store" });
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