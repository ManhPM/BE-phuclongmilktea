'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cart_details', {
      id_item: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Items", key: "id_item" },
        type: Sequelize.INTEGER
      },
      id_cart: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Carts", key: "id_cart" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cart_details');
  }
};