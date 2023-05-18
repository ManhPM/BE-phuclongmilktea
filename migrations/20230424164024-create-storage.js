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
      id_store: {
        type: Sequelize.INTEGER,
        references: { model: "Stores", key: "id_store" },
        allowNull: false
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