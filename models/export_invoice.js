'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Export_invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Storage, Export_invoice_detail}) {
      this.belongsTo(Storage, { foreignKey: "id_storage" });
      this.hasOne(Export_invoice_detail, { foreignKey: "id_e_invoice" });
      // define association here
    }
  }
  Export_invoice.init({
    id_e_invoice: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, 
    datetime: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Export_invoice',
    timestamps: false
  });
  return Export_invoice;
};