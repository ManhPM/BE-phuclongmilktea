'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Shippers", [
      {
        id_shipping_partner: 1,
        id_account: 4,
        name: "Phạm Minh Mạnh",
        email: "phammanhbeo2001@gmail.com",
        phone: "0123456789",
        address: "Hồ Chí Minh",
        description: "Mạnh-Shipper của GrabFood"
      },
      {
        id_shipping_partner: 2,
        id_account: 6,
        name: "Nguyễn Thành Trung",
        email: "phammanhbeo2001@gmail.com",
        phone: "0123456789",
        address: "Hồ Chí Minh",
        description: "Trung-Shipper của NowFood"
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
