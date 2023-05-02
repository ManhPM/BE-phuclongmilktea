'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Import_invoice_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Import_invoice, Unprocessed_ingredient}) {
      this.belongsTo(Import_invoice, { foreignKey: "id_i_invoice" });
      this.belongsTo(Unprocessed_ingredient, { foreignKey: "id_u_ingredient" });
      // define association here
    }
  }
  Import_invoice_detail.init({
    id_i_invoice: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_u_ingredient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Import_invoice_detail',
    timestamps: false
  });
  return Import_invoice_detail;
};