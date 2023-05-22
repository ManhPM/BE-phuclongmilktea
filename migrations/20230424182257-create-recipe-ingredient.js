'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipe_ingredients', {
      id_ingredient: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Ingredients", key: "id_ingredient" },
        type: Sequelize.INTEGER
      },
      id_u_ingredient: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Unprocessed_ingredients", key: "id_u_ingredient" },
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipe_ingredients');
  }
};