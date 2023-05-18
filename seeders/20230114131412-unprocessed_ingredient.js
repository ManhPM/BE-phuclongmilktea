'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Unprocessed_ingredients", [
      {
        name: 'Đường kính trắng (đường cát)',
        quantity: 10000,
        unit: 'g',
        id_store: 1
      },
      { name: 'Bột mì', quantity: 10000, unit: 'g', id_store: 1 },
      { name: 'Trứng gà', quantity: 200, unit: 'quả', id_store: 1 },
      { name: 'Bột gạo', quantity: 10000, unit: 'g', id_store: 1 },
      { name: 'Bột năng', quantity: 10000, unit: 'g', id_store: 1 },
      { name: 'Cacao', quantity: 2000, unit: 'g', id_store: 1 },
      { name: 'Trà Thái xanh', quantity: 2000, unit: 'g', id_store: 1 },
      { name: 'Trà Thái đỏ', quantity: 2000, unit: 'g', id_store: 1 },
      { name: 'Trà ô long hồng', quantity: 2000, unit: 'g', id_store: 1 },
      { name: 'Dâu ngâm', quantity: 30, unit: 'hộp', id_store: 1 },
      { name: 'Đào ngâm', quantity: 30, unit: 'hộp', id_store: 1 },
      { name: 'Xoài ngâm', quantity: 30, unit: 'hộp', id_store: 1 },
      { name: 'Táo ngâm', quantity: 30, unit: 'hộp', id_store: 1 },
      { name: 'Trà xanh', quantity: 2000, unit: 'g', id_store: 1 },
      { name: 'Đường nâu', quantity: 3000, unit: 'g', id_store: 1 },
      { name: 'Trà đen', quantity: 2000, unit: 'g', id_store: 1 },
      { name: 'Siro hương đào', quantity: 2000, unit: 'ml', id_store: 1 },
      { name: 'Sữa đặc', quantity: 10000, unit: 'ml', id_store: 1 },
      { name: 'Bột kem béo', quantity: 8000, unit: 'g', id_store: 1 },
      { name: 'Bột trà xanh', quantity: 500, unit: 'g', id_store: 1 },
      {
        name: 'Sữa tươi không đường',
        quantity: 300,
        unit: 'bịch',
        id_store: 1
      },
      {
        name: 'Đường kính trắng (đường cát)',
        quantity: 10000,
        unit: 'g',
        id_store: 2
      },
      { name: 'Bột mì', quantity: 10000, unit: 'g', id_store: 2 },
      { name: 'Trứng gà', quantity: 200, unit: 'quả', id_store: 2 },
      { name: 'Bột gạo', quantity: 10000, unit: 'g', id_store: 2 },
      { name: 'Bột năng', quantity: 10000, unit: 'g', id_store: 2 },
      { name: 'Cacao', quantity: 2000, unit: 'g', id_store: 2 },
      { name: 'Trà Thái xanh', quantity: 2000, unit: 'g', id_store: 2 },
      { name: 'Trà Thái đỏ', quantity: 2000, unit: 'g', id_store: 2 },
      { name: 'Trà ô long hồng', quantity: 2000, unit: 'g', id_store: 2 },
      { name: 'Dâu ngâm', quantity: 30, unit: 'hộp', id_store: 2 },
      { name: 'Đào ngâm', quantity: 30, unit: 'hộp', id_store: 2 },
      { name: 'Xoài ngâm', quantity: 30, unit: 'hộp', id_store: 2 },
      { name: 'Táo ngâm', quantity: 30, unit: 'hộp', id_store: 2 },
      { name: 'Trà xanh', quantity: 2000, unit: 'g', id_store: 2 },
      { name: 'Đường nâu', quantity: 3000, unit: 'g', id_store: 2 },
      { name: 'Trà đen', quantity: 2000, unit: 'g', id_store: 2 },
      { name: 'Siro hương đào', quantity: 2000, unit: 'ml', id_store: 2 },
      { name: 'Sữa đặc', quantity: 10000, unit: 'ml', id_store: 2 },
      { name: 'Bột kem béo', quantity: 8000, unit: 'g', id_store: 2 },
      { name: 'Bột trà xanh', quantity: 500, unit: 'g', id_store: 2 },
      {
        name: 'Sữa tươi không đường',
        quantity: 300,
        unit: 'bịch',
        id_store: 2
      }
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
