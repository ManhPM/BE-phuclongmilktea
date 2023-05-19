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
    return queryInterface.bulkInsert("Unprocessed_ingredient_stores", [
      { id_store: 2, id_u_ingredient: 1, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 2, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 3, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 4, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 5, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 6, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 7, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 8, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 9, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 10, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 11, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 12, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 13, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 14, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 15, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 16, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 17, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 18, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 19, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 20, quantity: 10000 },
      { id_store: 2, id_u_ingredient: 21, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 1, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 2, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 3, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 4, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 5, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 6, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 7, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 8, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 9, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 10, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 11, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 12, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 13, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 14, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 15, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 16, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 17, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 18, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 19, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 20, quantity: 10000 },
      { id_store: 1, id_u_ingredient: 21, quantity: 10000 },
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
