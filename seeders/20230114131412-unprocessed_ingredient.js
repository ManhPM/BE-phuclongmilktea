'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Unprocessed_ingredients", [
      {
        name: "Đường kính trắng (đường cát)",
        quantity: 10000,
        unit: "g",
      },
      {
        name: "Bột mì",
        quantity: 10000,
        unit: "g",
      },
      {
        name: "Trứng gà",
        quantity: 200,
        unit: "quả",
      },
      {
        name: "Bột gạo",
        quantity: 10000,
        unit: "g",
      },
      {
        name: "Bột năng",
        quantity: 10000,
        unit: "g",
      },
      {
        name: "Cacao",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Trà Thái xanh",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Trà Thái đỏ",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Trà ô long hồng",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Dâu ngâm",
        quantity: 30,
        unit: "hộp",
      },
      {
        name: "Đào ngâm",
        quantity: 30,
        unit: "hộp",
      },
      {
        name: "Xoài ngâm",
        quantity: 30,
        unit: "hộp",
      },
      {
        name: "Táo ngâm",
        quantity: 30,
        unit: "hộp",
      },
      {
        name: "Trà xanh",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Đường nâu",
        quantity: 3000,
        unit: "g",
      },
      {
        name: "Trà đen",
        quantity: 2000,
        unit: "g",
      },
      {
        name: "Siro hương đào",
        quantity: 2000,
        unit: "ml",
      },
      {
        name: "Sữa đặc",
        quantity: 10000,
        unit: "ml",
      },
      {
        name: "Bột kem béo",
        quantity: 8000,
        unit: "g",
      },
      {
        name: "Bột trà xanh",
        quantity: 500,
        unit: "g",
      },
      {
        name: "Sữa tươi không đường",
        quantity: 300,
        unit: "bịch",
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
