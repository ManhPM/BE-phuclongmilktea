'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ingredients", [
      {
        name: "Trà sữa đào",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà sữa xoài",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà sữa thái xanh",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà sữa thái đỏ",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà sữa truyền thống",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà sữa Chocolate",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà dứa",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà vải",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trà đào",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Trân châu đường đen",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Trân châu trắng",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Bánh flan",
        quantity: 150,
        unit: "cái",
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
