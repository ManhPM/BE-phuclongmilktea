'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Wishlist, Item}) {
      this.belongsTo(Wishlist, { foreignKey: "id_wishlist" });
      this.belongsTo(Item, { foreignKey: "id_item" });
    }
  }
  Wishlist_detail.init({
    id_wishlist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Wishlist_detail',
    timestamps: false
  });
  return Wishlist_detail;
};