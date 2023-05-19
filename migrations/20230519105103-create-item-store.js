'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Item_stores', {
      id_store: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Stores", key: "id_store" },
        type: Sequelize.INTEGER
      },
      id_item: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Items", key: "id_item" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Item_stores');
  }
};