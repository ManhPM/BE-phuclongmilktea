'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Providers", [
      {
        name: "Nông Sản Sao Khuê - Công Ty TNHH Thương Mại Xuất Nhập Khẩu Sao Khuê",
        address: "Số 135/17/63 Đường Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, Tp. Hồ Chí Minh (TPHCM)",
        phone: "0908261003",
      },
      {
        name: "CÔNG TY CỔ PHẦN FOCOCEV VIỆT NAM",
        address: "Số 21 đường Bùi Thị Xuân, Phường Bến Thành, Quận 1, Tp Hồ Chí Minh (TPHCM)",
        phone: "0286291024",
      },
      {
        name: "Công ty TNHH Thiết Bị Thái Bình",
        address: "Phòng 3C, tầng 3, 157 – 159 đường Xuân Hồng, phường 12, quận Tân Bình – Thành Phố Hồ Chí Minh",
        phone: "0976234380",
      },
      {
        name: "Công ty Cổ phần Hà Yến",
        address: "Số 3, Lô CN6, Cụm CN Vừa Và Nhỏ Từ Liêm, Phường Minh Khai, Quận Bắc Từ Liêm, Hà Nội, Việt Nam",
        phone: "0243765699",
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
