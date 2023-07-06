'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Reports", [
      {
        id_store: 1,
        date: "2023-07-08",
        countOrder: 3,
        revenue: 1100000,
      },
      {
        id_store: 1,
        date: "2023-07-08",
        countOrder: 5,
        revenue: 550000,
      },
      {
        id_store: 1,
        date: "2023-07-08",
        countOrder: 10,
        revenue: 660000,
      },
      {
        id_store: 2,
        date: "2023-07-08",
        countOrder: 5,
        revenue: 550000,
      },
      {
        id_store: 2,
        date: "2023-07-08",
        countOrder: 10,
        revenue: 660000,
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
