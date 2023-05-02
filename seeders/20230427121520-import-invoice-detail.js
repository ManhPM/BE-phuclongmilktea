'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Import_invoice_details", [
      {
        id_u_ingredient: 1,
        id_i_invoice: 1,
        quantity: 10000,
        unit_price: 20,
      },
      {
        id_u_ingredient: 2,
        id_i_invoice: 1,
        quantity: 10000,
        unit_price: 20,
      },
      {
        id_u_ingredient: 3,
        id_i_invoice: 1,
        quantity: 200,
        unit_price: 1800,
      },
      {
        id_u_ingredient: 5,
        id_i_invoice: 1,
        quantity: 10000,
        unit_price: 20,
      },
      {
        id_u_ingredient: 6,
        id_i_invoice: 1,
        quantity: 10000,
        unit_price: 20,
      },
      {
        id_u_ingredient: 7,
        id_i_invoice: 1,
        quantity: 2000,
        unit_price: 200,
      },
      {
        id_u_ingredient: 8,
        id_i_invoice: 1,
        quantity: 2000,
        unit_price: 200,
      },
      {
        id_u_ingredient: 9,
        id_i_invoice: 1,
        quantity: 2000,
        unit_price: 250,
      },
      {
        id_u_ingredient: 10,
        id_i_invoice: 1,
        quantity: 30,
        unit_price: 60000,
      },
      {
        id_u_ingredient: 11,
        id_i_invoice: 1,
        quantity: 30,
        unit_price: 60000,
      },
      {
        id_u_ingredient: 12,
        id_i_invoice: 1,
        quantity: 30,
        unit_price: 60000,
      },
      {
        id_u_ingredient: 13,
        id_i_invoice: 1,
        quantity: 30,
        unit_price: 60000,
      },
      {
        id_u_ingredient: 14,
        id_i_invoice: 2,
        quantity: 2000,
        unit_price: 200,
      },
      {
        id_u_ingredient: 15,
        id_i_invoice: 2,
        quantity: 3000,
        unit_price: 100,
      },
      {
        id_u_ingredient: 16,
        id_i_invoice: 2,
        quantity: 2000,
        unit_price: 200,
      },
      {
        id_u_ingredient: 17,
        id_i_invoice: 2,
        quantity: 2000,
        unit_price: 200,
      },
      {
        id_u_ingredient: 18,
        id_i_invoice: 2,
        quantity: 10000,
        unit_price: 60,
      },
      {
        id_u_ingredient: 19,
        id_i_invoice: 2,
        quantity: 8000,
        unit_price: 40,
      },
      {
        id_u_ingredient: 20,
        id_i_invoice: 2,
        quantity: 500,
        unit_price: 500,
      },
      {
        id_u_ingredient: 21,
        id_i_invoice: 2,
        quantity: 300,
        unit_price: 7000,
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
