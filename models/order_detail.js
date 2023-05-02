'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Item, Order}) {
      this.belongsTo(Item, { foreignKey: "id_item" });
      this.belongsTo(Order, { foreignKey: "id_order" });
    }
  }
  Order_detail.init({
    id_order: {
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
    modelName: 'Order_detail',
    timestamps: false
  });
  return Order_detail;
};