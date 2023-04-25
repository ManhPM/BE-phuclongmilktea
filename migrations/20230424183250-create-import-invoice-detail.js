'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Import_invoice_details', {
      id_ingredient: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Ingredients", key: "id_ingredient" },
        type: Sequelize.INTEGER
      },
      id_i_invoice: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Import_invoices", key: "id_i_invoice" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unit_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Import_invoice_details');
  }
};