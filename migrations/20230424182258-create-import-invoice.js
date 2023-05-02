'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Import_invoices', {
      id_i_invoice: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_storage: {
        type: Sequelize.INTEGER,
        references: { model: "Storages", key: "id_storage" },
        allowNull: false
      },
      id_staff: {
        type: Sequelize.INTEGER,
        references: { model: "Staffs", key: "id_staff" },
        allowNull: false
      },
      id_provider: {
        type: Sequelize.INTEGER,
        references: { model: "Providers", key: "id_provider" },
        allowNull: false
      },
      datetime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Import_invoices');
  }
};