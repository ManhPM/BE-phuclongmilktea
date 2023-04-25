'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cart_detail, Customer}) {
      this.hasOne(Cart_detail, { foreignKey: "id_cart" });
      this.belongsTo(Customer, { foreignKey: "id_customer" });
    }
  }
  Cart.init({
    id_cart: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: false
  });
  return Cart;
};