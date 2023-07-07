'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Stores", [
      {
        storeLat: "10.85025804481258",
        storeLng: "106.76530384273872",
        name: "Phúc Long Estella Place",
        address: "1012 Kha Vạn Cân, Phường Linh Chiểu, TP. Thủ Đức",
        phone: "028 3811 5555",
        email: "phuclongmilktea1@gmail.com",
        image: "https://phuclong.com.vn/uploads/gallery/8815e03a817310-37812889_1785422298194068_1073543890432163840_o.jpg",
      },
      {
        storeLat: "10.65025804481258",
        storeLng: "106.46530384273872",
        name: "Phúc Long Thiso Mal",
        address: "Khu Công nghệ cao TP.HCM (SHTP), Xa lộ Hà Nội, Phường Hiệp Phú, TP. Thủ Đức",
        phone: "028 3811 5555",
        email: "phuclongmilktea2@gmail.com",
        image: "https://phuclong.com.vn/uploads/store/51f7cbf1d9d10e-lotteq11.jpg",
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
