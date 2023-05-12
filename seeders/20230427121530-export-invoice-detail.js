'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Export_invoice_details", [
      {
        id_u_ingredient: 1,
        id_e_invoice: 1,
        quantity: 10,
        unit_price: 20,
      },
      {
        id_u_ingredient: 2,
        id_e_invoice: 1,
        quantity: 10,
        unit_price: 20,
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
