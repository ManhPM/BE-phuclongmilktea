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
    return queryInterface.bulkInsert("Cart_details", [
      {
        id_item: 1,
        id_cart: 1,
        quantity: 2,
      },
      {
        id_item: 1,
        id_cart: 2,
        quantity: 3,
      },
      {
        id_item: 10,
        id_cart: 1,
        quantity: 2,
      },
      {
        id_item: 15,
        id_cart: 2,
        quantity: 3,
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
