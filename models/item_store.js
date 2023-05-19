'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Item, Store}) {
      this.belongsTo(Item, { foreignKey: "id_item" });
      this.belongsTo(Store, { foreignKey: "id_store" });
      // define association here
    }
  }
  Item_store.init({
    id_store: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item_store',
    timestamps: false
  });
  return Item_store;
};