'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Export_invoices', {
      id_e_invoice: {
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
      datetime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Export_invoices');
  }
};