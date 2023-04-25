'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer, Wishlist_detail}) {
      this.belongsTo(Customer, { foreignKey: "id_customer" });
      this.hasOne(Wishlist_detail, { foreignKey: "id_wishlist" });
    }
  }
  Wishlist.init({
    id_wishlist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Wishlist',
    timestamps: false
  });
  return Wishlist;
};