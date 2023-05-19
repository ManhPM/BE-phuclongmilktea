'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Unprocessed_ingredient_stores', {
      id_store: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Stores", key: "id_store" },
        type: Sequelize.INTEGER
      },
      id_u_ingredient: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Unprocessed_ingredients", key: "id_u_ingredient" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Unprocessed_ingredient_stores');
  }
};