"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ingredients", [
      { name: "Trà sữa đào", quantity: 10000, unit: "ml", id_store: 1 },
      { name: "Trà sữa xoài", quantity: 10000, unit: "ml", id_store: 1 },
      {
        name: "Trà sữa thái xanh",
        quantity: 10000,
        unit: "ml",
        id_store: 1,
      },
      { name: "Trà sữa thái đỏ", quantity: 10000, unit: "ml", id_store: 1 },
      {
        name: "Trà sữa truyền thống",
        quantity: 10000,
        unit: "ml",
        id_store: 1,
      },
      {
        name: "Trà sữa Chocolate",
        quantity: 10000,
        unit: "ml",
        id_store: 1,
      },
      { name: "Trà dứa", quantity: 10000, unit: "ml", id_store: 1 },
      { name: "Trà vải", quantity: 10000, unit: "ml", id_store: 1 },
      { name: "Trà đào", quantity: 10000, unit: "ml", id_store: 1 },
      {
        name: "Trân châu đường đen",
        quantity: 2000,
        unit: "g",
        id_store: 1,
      },
      { name: "Trân châu trắng", quantity: 2000, unit: "g", id_store: 1 },
      { name: "Bánh flan", quantity: 150, unit: "cái", id_store: 1 },
      { name: "Trà sữa đào", quantity: 10000, unit: "ml", id_store: 2 },
      { name: "Trà sữa xoài", quantity: 10000, unit: "ml", id_store: 2 },
      {
        name: "Trà sữa thái xanh",
        quantity: 10000,
        unit: "ml",
        id_store: 2,
      },
      { name: "Trà sữa thái đỏ", quantity: 10000, unit: "ml", id_store: 2 },
      {
        name: "Trà sữa truyền thống",
        quantity: 10000,
        unit: "ml",
        id_store: 2,
      },
      {
        name: "Trà sữa Chocolate",
        quantity: 10000,
        unit: "ml",
        id_store: 2,
      },
      { name: "Trà dứa", quantity: 10000, unit: "ml", id_store: 2 },
      { name: "Trà vải", quantity: 10000, unit: "ml", id_store: 2 },
      { name: "Trà đào", quantity: 10000, unit: "ml", id_store: 2 },
      {
        name: "Trân châu đường đen",
        quantity: 2000,
        unit: "g",
        id_store: 2,
      },
      { name: "Trân châu trắng", quantity: 2000, unit: "g", id_store: 2 },
      { name: "Bánh flan", quantity: 150, unit: "cái", id_store: 2 },
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
