'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ingredient_stores', {
      id_ingredient: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Ingredients", key: "id_ingredient" },
        type: Sequelize.INTEGER
      },
      id_store: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Stores", key: "id_store" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ingredient_stores');
  }
};