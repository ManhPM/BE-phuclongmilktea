'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Account, Cart, Order}) {
      this.belongsTo(Account, { foreignKey: "id_account" });
      this.hasOne(Cart, { foreignKey: "id_customer" });
      this.hasOne(Order, { foreignKey: "id_customer" });
    }
  }
  Customer.init({
    id_customer: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: false
  });
  return Customer;
};