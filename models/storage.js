'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Storage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Import_invoice, Export_invoice}) {
      this.hasOne(Import_invoice, { foreignKey: "id_storage" });
      this.hasOne(Export_invoice, { foreignKey: "id_storage" });
    }
  }
  Storage.init({
    id_storage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Storage',
    timestamps: false
  });
  return Storage;
};