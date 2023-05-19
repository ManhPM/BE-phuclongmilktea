'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Recipe, Cart_detail, Wishlist_detail, Order_detail, Type, Ingredient_store}) {
      this.hasOne(Cart_detail, { foreignKey: "id_item" });
      this.hasOne(Order_detail, { foreignKey: "id_item" });
      this.hasOne(Wishlist_detail, { foreignKey: "id_item" });
      this.hasOne(Recipe, { foreignKey: "id_item" });
      this.hasOne(Ingredient_store, { foreignKey: "id_item" });
      this.belongsTo(Type, { foreignKey: "id_type" });
      // define association here
    }
  }
  Item.init({
    id_item: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    timestamps: false
  });
  return Item;
};