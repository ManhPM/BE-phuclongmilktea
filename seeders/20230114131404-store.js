'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Stores", [
      {
        storeLat: "10.85025804481258",
        storeLng: "106.76530384273872",
        name: "Cửa Hàng 1",
        address: "1012 Kha Vạn Cân, Phường Linh Chiểu, TP. Thủ Đức",
        phone: "028 3811 5555",
        email: "phuclongmilktea1@gmail.com"
      },
      {
        storeLat: "10.65025804481258",
        storeLng: "106.46530384273872",
        name: "Cửa Hàng 2",
        address: "Khu Công nghệ cao TP.HCM (SHTP), Xa lộ Hà Nội, Phường Hiệp Phú, TP. Thủ Đức",
        phone: "028 3811 5555",
        email: "phuclongmilktea2@gmail.com"
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
