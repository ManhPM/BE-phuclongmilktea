'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Shipping_partners", [
      {
        name: "GrabFood",
        address: "Hồ Chí Minh"
      },
      {
        name: "NowFood",
        address: "Hồ Chí Minh"
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
