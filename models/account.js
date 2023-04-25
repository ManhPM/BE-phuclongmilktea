'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Staff, Shipper, Customer, Role}) {
      this.belongsTo(Role, { foreignKey: "id_role" });
      this.hasOne(Staff, { foreignKey: "id_account" });
      this.hasOne(Shipper, { foreignKey: "id_account" });
      this.hasOne(Customer, { foreignKey: "id_account" });
      // define association here
    }
  }
  Account.init({
    id_account: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.INTEGER,
    forgot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
    timestamps: false
  });
  return Account;
};