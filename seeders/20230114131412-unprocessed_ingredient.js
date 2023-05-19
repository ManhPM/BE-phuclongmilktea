"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Unprocessed_ingredients", [
      {
        name: "Đường kính trắng (đường cát)",
        unit: "g",
      },
      { name: "Bột mì", unit: "g" },
      { name: "Trứng gà", unit: "quả" },
      { name: "Bột gạo", unit: "g" },
      { name: "Bột năng", unit: "g" },
      { name: "Cacao", unit: "g" },
      { name: "Trà Thái xanh", unit: "g" },
      { name: "Trà Thái đỏ", unit: "g" },
      { name: "Trà ô long hồng", unit: "g" },
      { name: "Dâu ngâm", unit: "hộp" },
      { name: "Đào ngâm", unit: "hộp" },
      { name: "Xoài ngâm", unit: "hộp" },
      { name: "Táo ngâm", unit: "hộp" },
      { name: "Trà xanh", unit: "g" },
      { name: "Đường nâu", unit: "g" },
      { name: "Trà đen", unit: "g" },
      { name: "Siro hương đào", unit: "ml" },
      { name: "Sữa đặc", unit: "ml" },
      { name: "Bột kem béo", unit: "g" },
      { name: "Bột trà xanh", unit: "g" },
      {
        name: "Sữa tươi không đường",
        unit: "bịch",
      },
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
