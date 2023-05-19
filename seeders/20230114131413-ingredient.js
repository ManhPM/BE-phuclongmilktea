"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ingredients", [
      { name: "Trà sữa đào", unit: "ml" },
      { name: "Trà sữa xoài", unit: "ml" },
      {
        name: "Trà sữa thái xanh",

        unit: "ml",
      },
      { name: "Trà sữa thái đỏ", unit: "ml" },
      {
        name: "Trà sữa truyền thống",

        unit: "ml",
      },
      {
        name: "Trà sữa Chocolate",

        unit: "ml",
      },
      { name: "Trà dứa", unit: "ml" },
      { name: "Trà vải", unit: "ml" },
      { name: "Trà đào", unit: "ml" },
      {
        name: "Trân châu đường đen",
        unit: "g",
      },
      { name: "Trân châu trắng", unit: "g" },
      { name: "Bánh flan", unit: "cái" },
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
