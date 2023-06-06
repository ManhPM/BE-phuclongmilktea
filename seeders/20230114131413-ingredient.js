"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Ingredients", [
      { name: "Trà sữa đào", unit: "ml", image: "https://gongcha.com.vn/wp-content/uploads/2021/12/Tra-Sua-Dao.png" },
      { name: "Trà sữa xoài", unit: "ml", image: "https://dayphache.edu.vn/wp-content/uploads/2019/04/mon-tra-sua-xoai.jpg" },
      {
        name: "Trà sữa thái xanh",
        unit: "ml",
        image: "https://barona.vn/storage/meo-vat/182/cach-lam-tra-sua-thai-xanh.jpg"
      },
      { name: "Trà sữa thái đỏ", unit: "ml", image: "https://bizweb.dktcdn.net/100/004/714/products/tra-thai-do-4eabea5d-83f7-4da4-8b0c-902b9ea814dd.png?v=1628242727490" },
      {
        name: "Trà sữa truyền thống",
        unit: "ml",
        image: "https://product.hstatic.net/1000220639/product/tra-sua-luave-truyen-thong-5_c4b5c11d32b745d18b0bfaf9e97d3da7_1024x1024.jpg"
      },
      {
        name: "Trà sữa Chocolate",
        unit: "ml",
        image: "https://jarvis.vn/wp-content/uploads/2019/05/tra%CC%80-su%CC%83a-socola.jpg"
      },
      { name: "Trà dứa", unit: "ml", image: "https://product.hstatic.net/200000078599/product/tra_dua_dua_nhiet_doi_cd476a863e2f4967aa4099fda88e031c_master.png" },
      { name: "Trà vải", unit: "ml", image: "https://product.hstatic.net/200000140863/product/67.tra_vai_967d6fdff6c2419ba08dd50667985317_1024x1024.png" },
      { name: "Trà đào", unit: "ml", image: "https://tmfoodsdalat.vn/thumbs/960x960x2/upload/product/thiet-ke-chua-co-ten-71-7867.png" },
      {
        name: "Trân châu đường đen",
        unit: "g",
        image: "https://www.hoidaubepaau.com/wp-content/uploads/2018/11/vien-tran-chau.jpg"
      },
      { name: "Trân châu trắng", unit: "g", image: "https://cong-news.appwifi.com/wp-content/uploads/2022/05/tra%CC%82n-cha%CC%82u-tra%CC%86%CC%81ng.jpg" },
      { name: "Bánh flan", unit: "cái", image: "https://www.baobaclieu.vn/uploads/image/2021/05/26/8-7.jpg" },
      { name: "Thạch khoai môn", unit: "g", image: "https://vn-live-01.slatic.net/p/adaeeddd5828d198f083234d905f5c7c.jpg" },
      { name: "Thạch phô mai", unit: "g", image: "https://tamlong.com.vn/wp-content/uploads/2020/02/cach-lam-thach-pho-mai-vien-600x653.jpg" },
      { name: "Sương sáo", unit: "g", image: "https://img-global.cpcdn.com/recipes/2817058270df0df7/400x400cq70/photo.jpg" },
      { name: "Khúc bạch", unit: "g", image: "https://hpcvietblog.files.wordpress.com/2019/09/d9479-topping-khuc-bach.jpg" },
      { name: "Hạt thuỷ tinh", unit: "g", image: "https://product.hstatic.net/1000220639/product/upload_3d600247647042a8aaa46b6a3afa5de8.jpg" },
      { name: "Trân châu hoàng kim", unit: "g", image: "https://minhhanhfood.vn/wp-content/uploads/2022/04/5cfdbc04cf04455f307ba6d1a84a8c98.jpeg" },
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
