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
        name: "Phạm Minh Mạnh",
        gender: "Nam",
        birthday: "2001-01-11",
        email: "phammanhbeo2001@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "Nhân viên Mạnh",
      },
      {
        id_account: 2,
        name: "ADMIN",
        gender: "Nam",
        birthday: "2001-01-11",
        email: "phammanhbeo2001@gmail.com",
        phone: "0966123123",
        address: "Đồng Nai",
        description: "ADMIN",
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
