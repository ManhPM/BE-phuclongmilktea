'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Storages', {
      id_storage: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Storages');
  }
};