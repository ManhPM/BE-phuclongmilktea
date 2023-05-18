'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Account, Import_invoice, Export_invoice, Store}) {
      this.hasOne(Import_invoice, { foreignKey: "id_staff" });
      this.hasOne(Export_invoice, { foreignKey: "id_staff" });
      this.belongsTo(Account, { foreignKey: "id_account" });
      this.belongsTo(Store, { foreignKey: "id_store" });
    }
  }
  Staff.init({
    id_staff: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Staff',
    timestamps: false
  });
  return Staff;
};