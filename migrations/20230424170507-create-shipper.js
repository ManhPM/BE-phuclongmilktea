'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shippers', {
      id_shipper: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_account: {
        type: Sequelize.INTEGER,
        references: { model: "Accounts", key: "id_account" },
        allowNull: false
      },
      id_shipping_partner: {
        type: Sequelize.INTEGER,
        references: { model: "Shipping_partners", key: "id_shipping_partner" },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shippers');
  }
};