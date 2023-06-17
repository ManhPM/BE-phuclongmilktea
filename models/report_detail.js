'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Item, Report}) {
      this.belongsTo(Item, { foreignKey: "id_item" });
      this.belongsTo(Report, { foreignKey: "id_report" });
    }
  }
  Report_detail.init({
    id_report: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sold: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report_detail',
    timestamps: false,
  });
  return Report_detail;
};