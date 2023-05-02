'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id_role: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};