'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Import_invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Storage, Import_invoice_detail}) {
      this.belongsTo(Staff, { foreignKey: "id_staff" });
      this.hasOne(Import_invoice_detail, { foreignKey: "id_i_invoice" });
      // define association here
    }
  }
  Import_invoice.init({
    id_i_invoice: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    datetime: DataTypes.DATE,
    status: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Import_invoice',
    timestamps: false
  });
  return Import_invoice;
};