"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Unprocessed_ingredients", [
      {
        name: "Đường kính trắng (đường cát)",
        image: "https://cf.shopee.vn/file/da2764d613b765b8bcc1d4fa429b7aee",
        unit: "g",
      },
      { name: "Bột mì", unit: "g", image: "https://cdn.tgdd.vn/Products/Images/2388/83375/bhx/bot-mi-da-dung-meizan-goi-1kg-201903221403085142.jpg", },
      { name: "Trứng gà", unit: "quả", image: "https://product.hstatic.net/1000309753/product/trung_076e3658a6e448bda26239b94f10e571_17d511ab207048eaa75fdde74026ad92_master.jpg", },
      { name: "Bột gạo", unit: "g", image: "https://cdn.tgdd.vn/Products/Images/2388/83414/bhx/bot-gao-taky-400gam-2-700x467.jpg", },
      { name: "Bột năng", unit: "g", image: "https://meizanclv.com.vn/wp-content/uploads/2021/12/Mockup-BNang-1kg.png", },
      { name: "Cacao", unit: "g", image: "https://product.hstatic.net/1000220639/product/cacao_powder__front__ad5f8776d526434a80932e7cde1d406b.png", },
      { name: "Trà Thái xanh", unit: "g", image: "https://product.hstatic.net/1000107402/product/nguyenlieuphachesi.com_tra_thai_xanh_1024x1024.jpg", },
      { name: "Trà Thái đỏ", unit: "g", image: "https://product.hstatic.net/1000107402/product/nguyenlieuphachesi.com_tra_thai_do.jpg", },
      { name: "Trà ô long hồng", unit: "g", image: "https://huongtraviet.com/wp-content/uploads/2019/03/H%E1%BB%93ng-Tr%C3%A0-54g.png", },
      { name: "Dâu ngâm", unit: "hộp", image: "https://cookbeo.com/media/2021/04/dau-tam-ngam-duong/dau-tam-ngam-duong-4x5.jpg", },
      { name: "Đào ngâm", unit: "hộp", image: "https://khohangtieudung.vn/wp-content/uploads/2022/02/Dao-Ngam-BoddoB.jpg", },
      { name: "Xoài ngâm", unit: "hộp", image: "https://cf.shopee.vn/file/0c4863e654f3e3697fcb0c957ec63fb7", },
      { name: "Táo ngâm", unit: "hộp", image: "https://shopnguyenlieu.com/wp-content/uploads/2022/08/ta%CC%81o-nif-768x768.png", },
      { name: "Trà xanh", unit: "g", image: "https://cuongquat.com/files/sanpham/1031/1/jpg/tra-xanh-thai-nguyen-phuc-long-goi-100grmua-25-tang-1.jpg", },
      { name: "Đường nâu", unit: "g", image: "https://cdn.tgdd.vn/Products/Images/2804/200375/bhx/duong-nau-toan-phat-dark-brown-sugar-goi-1kg-201903111521072469.jpg", },
      { name: "Trà đen", unit: "g", image: "https://khonguyenlieu.com/wp-content/uploads/2020/06/60034681e08ddb49b1ab6e134dc3e4dd.jpg", },
      { name: "Siro hương đào", unit: "ml", image: "https://vn-test-11.slatic.net/p/7dae8d40f5e4315ac8a4f486a986c345.jpg", },
      { name: "Sữa đặc", unit: "ml", image: "https://product.hstatic.net/1000284648/product/sua_dac_la_rosee_1kg_e6865941c95b47c9b983aec389866846.jpg", },
      { name: "Bột kem béo", unit: "g", image: "https://product.hstatic.net/1000284648/product/bot_kem_beo_thuc_vat_luave_e5577a9be5d54535b48678a59b87caa9.png", },
      { name: "Bột trà xanh", unit: "g", image: "https://product.hstatic.net/200000135315/product/bot-tra-xanh-matcha_512f9021a0d34a14b9cfa34641e72d8c_master.png", },
      {
        name: "Sữa tươi không đường",
        unit: "bịch",
        image: "https://product.hstatic.net/1000074072/product/bich_fino_sua_tuoi_-_khong_duong_c6990e9228e343b3b76885870916fec6_master.png",
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
