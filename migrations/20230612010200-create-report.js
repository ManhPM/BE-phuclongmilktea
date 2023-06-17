'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      id_report: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_store: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Stores", key: "id_store" },
        type: Sequelize.INTEGER
      },
      revenue: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      countOrder: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reports');
  }
};