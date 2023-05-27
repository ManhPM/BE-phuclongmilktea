'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id_account: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_role: {
        type: Sequelize.INTEGER,
        references: { model: "Roles", key: "id_role" },
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      forgot: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};