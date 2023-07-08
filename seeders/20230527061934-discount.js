'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Discounts", [
      {
        code: "SALE5",
        discount_percent: 5,
        start_date: "2023-05-26",
        end_date: "2023-07-26",
        min_quantity: 3,
        quantity: 10,
        description: "Giảm 5% cho tổng hoá đơn, số lượng sản phẩm tối thiểu là 3",
      },
      {
        code: "SALE10",
        discount_percent: 10,
        start_date: "2023-05-26",
        end_date: "2023-07-26",
        min_quantity: 5,
        quantity: 10,
        description: "Giảm 10% cho tổng hoá đơn, số lượng sản phẩm tối thiểu là 5",
      },
      {
        code: "SALE15",
        discount_percent: 15,
        start_date: "2023-05-26",
        end_date: "2023-07-26",
        min_quantity: 10,
        quantity: 10,
        description: "Giảm 15% cho tổng hoá đơn, số lượng sản phẩm tối thiểu là 10",
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
