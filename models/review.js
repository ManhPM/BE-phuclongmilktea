'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer, Item}) {
      this.belongsTo(Customer, { foreignKey: "id_customer" });
      this.belongsTo(Item, { foreignKey: "id_item" });
    }
  }
  Review.init({
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_customer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    rating: DataTypes.FLOAT,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};