"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Staffs", [
      {
        id_account: 3,
        id_store: 1,
        name: "Phạm Minh Mạnh",
        gender: "Nam",
        birthday: "2001-01-11",
        email: "phammanhbeo20011@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "Nhân viên cửa hàng 1",
      },
      {
        id_account: 2,
        id_store: 1,
        name: "ADMIN",
        gender: "Nữ",
        birthday: "2001-01-11",
        email: "phammanhbeo20012@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "Admin cửa hàng 1",
      },
      {
        id_account: 7,
        id_store: 2,
        name: "Phạm Minh Mạnh",
        gender: "Nam",
        birthday: "2001-01-11",
        email: "phammanhbeo20013@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "Admin cửa hàng 2",
      },
      {
        id_account: 8,
        id_store: 2,
        name: "Phạm Minh Mạnh",
        gender: "Nữ",
        birthday: "2001-01-11",
        email: "phammanhbeo20014@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "Nhân viên cửa hàng 2",
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
