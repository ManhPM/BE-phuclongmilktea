'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Recipe_ingredients", [
      {
        id_ingredient: 1,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 1,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 1,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 1,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 1,
        id_u_ingredient: 17,
        quantity: 1,
      },
      {
        id_ingredient: 2,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 2,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 2,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 2,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 3,
        id_u_ingredient: 11,
        quantity: 0.0050,
      },
      {
        id_ingredient: 3,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 3,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 3,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 3,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 3,
        id_u_ingredient: 7,
        quantity: 1,
      },
      {
        id_ingredient: 4,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 4,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 4,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 4,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 4,
        id_u_ingredient: 8,
        quantity: 1,
      },
      {
        id_ingredient: 5,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 5,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 5,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 5,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 5,
        id_u_ingredient: 16,
        quantity: 1,
      },
      {
        id_ingredient: 6,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 6,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 6,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 6,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 6,
        id_u_ingredient: 16,
        quantity: 1,
      },
      {
        id_ingredient: 7,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 7,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 7,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 7,
        id_u_ingredient: 18,
        quantity: 1,
      },
      {
        id_ingredient: 7,
        id_u_ingredient: 16,
        quantity: 1,
      },
      {
        id_ingredient: 8,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 8,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 8,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 9,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 9,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 9,
        id_u_ingredient: 19,
        quantity: 1,
      },
      {
        id_ingredient: 10,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 10,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 10,
        id_u_ingredient: 13,
        quantity: 1,
      },
      {
        id_ingredient: 11,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 11,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 11,
        id_u_ingredient: 11,
        quantity: 1,
      },
      {
        id_ingredient: 12,
        id_u_ingredient: 1,
        quantity: 1,
      },
      {
        id_ingredient: 12,
        id_u_ingredient: 21,
        quantity: 1,
      },
      {
        id_ingredient: 12,
        id_u_ingredient: 5,
        quantity: 1,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
