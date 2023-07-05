"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Wishlist_details", [
      {
        id_item: 1,
        id_wishlist: 1,
      },
      {
        id_item: 3,
        id_wishlist: 1,
      },
      {
        id_item: 5,
        id_wishlist: 1,
      },
      {
        id_item: 4,
        id_wishlist: 1,
      },
      {
        id_item: 9,
        id_wishlist: 1,
      },
      {
        id_item: 15,
        id_wishlist: 1,
      },
      {
        id_item: 7,
        id_wishlist: 2,
      },
      {
        id_item: 9,
        id_wishlist: 2,
      },
      {
        id_item: 11,
        id_wishlist: 2,
      },
      {
        id_item: 15,
        id_wishlist: 2,
      },
      {
        id_item: 20,
        id_wishlist: 2,
      },
      {
        id_item: 22,
        id_wishlist: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
