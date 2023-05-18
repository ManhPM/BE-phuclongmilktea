'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      storeLat: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      storeLng: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  }
};