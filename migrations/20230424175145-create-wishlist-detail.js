'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wishlist_details', {
      id_item: {
        allowNull: false,
        primaryKey: true,
        references: { model: "Items", key: "id_item" },
        type: Sequelize.INTEGER
      },
      id_wishlist: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: "Wishlists", key: "id_wishlist" },
        allowNull: false
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wishlist_details');
  }
};