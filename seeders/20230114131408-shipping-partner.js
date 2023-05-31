'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Shipping_partners", [
      {
        name: "GrabFood",
        address: "Hồ Chí Minh",
        unit_price: 3000,
      },
      {
        name: "NowFood",
        address: "Hồ Chí Minh",
        unit_price: 3500,
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
