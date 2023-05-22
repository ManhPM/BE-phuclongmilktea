'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_customer: {
        type: Sequelize.INTEGER,
        references: { model: "Customers", key: "id_customer" },
        allowNull: false
      },
      id_store: {
        type: Sequelize.INTEGER,
        references: { model: "Stores", key: "id_store" },
        allowNull: false
      },
      id_payment: {
        type: Sequelize.INTEGER,
        references: { model: "Payment_methods", key: "id_payment" },
        allowNull: false
      },
      id_shipper: {
        type: Sequelize.INTEGER,
        references: { model: "Shippers", key: "id_shipper" },
      },
      id_shipping_partner: {
        type: Sequelize.INTEGER,
        references: { model: "Shipping_partners", key: "id_shipping_partner" },
        allowNull: false
      },
      time_order: {
        type: Sequelize.DATE,
        allowNull: false
      },
      time_confirm: {
        type: Sequelize.DATE
      },
      time_shipper_receive: {
        type: Sequelize.DATE
      },
      time_shipper_delivered: {
        type: Sequelize.DATE
      },
      delivery_fee: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      item_fee: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};