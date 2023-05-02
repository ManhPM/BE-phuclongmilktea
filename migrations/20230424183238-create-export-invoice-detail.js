'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Export_invoice_details', {
      id_u_ingredient: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Unprocessed_ingredients", key: "id_u_ingredient" },
        type: Sequelize.INTEGER
      },
      id_e_invoice: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Export_invoices", key: "id_e_invoice" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unit_price: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Export_invoice_details');
  }
};