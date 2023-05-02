'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Import_invoices", [
      {
        id_storage: 1,
        id_staff: 1,
        id_provider: 1,
        datetime: "2023-01-23 06:30:00",
        status: 1,
        description: "Nhập hàng",
      },
      {
        id_storage: 1,
        id_staff: 1,
        id_provider: 2,
        datetime: "2023-01-23 06:30:00",
        status: 1,
        description: "Nhập hàng",
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
