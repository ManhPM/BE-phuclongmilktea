'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shipping_partner, Order}) {
      this.belongsTo(Shipping_partner, { foreignKey: "id_shipping_partner" });
      this.hasOne(Order, { foreignKey: "id_shipper" });
    }
  }
  Shipper.init({
    id_shipper: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shipper',
    timestamps: false
  });
  return Shipper;
};