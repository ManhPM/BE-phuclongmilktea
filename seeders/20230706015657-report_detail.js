'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Report_details", [
      {
        id_report: 1,
        id_item: 3,
        sold: 10,
        total: 550000,
      },
      {
        id_report: 1,
        id_item: 4,
        sold: 10,
        total: 550000,
      },
      {
        id_report: 2,
        id_item: 3,
        sold: 5,
        total: 275000,
      },
      {
        id_report: 2,
        id_item: 4,
        sold: 5,
        total: 275000,
      },
      {
        id_report: 3,
        id_item: 3,
        sold: 6,
        total: 330000,
      },
      {
        id_report: 3,
        id_item: 4,
        sold: 6,
        total: 330000,
      },
      {
        id_report: 4,
        id_item: 3,
        sold: 5,
        total: 275000,
      },
      {
        id_report: 4,
        id_item: 4,
        sold: 5,
        total: 275000,
      },
      {
        id_report: 5,
        id_item: 3,
        sold: 6,
        total: 330000,
      },
      {
        id_report: 5,
        id_item: 4,
        sold: 6,
        total: 330000,
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
