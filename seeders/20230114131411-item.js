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
    return queryInterface.bulkInsert("Items", [
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/e3a453a57402ee-65000307trsanhnsen.png',
        name: 'Trà Sữa Nhãn Sen',
        price: 55000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/c4692e6548c0af-65000306hngtrcarameldaxay.png',
        name: 'Hồng Trà Caramel Dừa Đá Xay',
        price: 70000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/1fc4620223d5c3-6500030265000303hngtrsacaramel.png',
        name: 'Hồng Trà Sữa Caramel',
        price: 55000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/437b59a57e7efd-6500030465000305trlongdacaramel.png',
        name: 'Trà Ô Long Dừa Caramel',
        price: 55000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/37702760a2b2e3-65000309nhnxay.png',
        name: 'Nhãn Đá Xay',
        price: 70000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/a66aecd5b760eb-traolongmangcau.png',
        name: 'Trà Ô Long Mãng Cầu',
        price: 55000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/4d247cffb2c4d5-hngtrchanh.png',
        name: 'Hồng Trà Chanh',
        price: 35000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/d1cd8bafdefe9d-matchalattephclong.png',
        name: 'Trà Sữa Matcha',
        price: 40000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/a75db2931ab34c-hngtrsaphclongtrosaphclong.png',
        name: 'Hồng Trà Đào Sữa',
        price: 45000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/64bd44180be24c-sinhtchanh.png',
        name: 'Chanh Đá Xay',
        price: 50000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/5db8d7830383fe-trxanhxay.png',
        name: 'Matcha Đá Xay',
        price: 60000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/72781119ecd681-sclaxaycnghnhnhnvespresso.png',
        name: 'Oreo Cà Phê Sữa Đá Xay',
        price: 60000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/d12b476cb8261d-cphcappuccinoxay.png',
        name: 'Cà Phê Đá Xay',
        price: 60000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/4bab552f7ed0a6-trasuaberryberry60000839.png',
        name: 'Trà Sữa Berry Berry',
        price: 60000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/84c7b821bde822-troxay.png',
        name: 'Trà Đào Đá Xay',
        price: 65000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/1fc4620223d5c3-6500030265000303hngtrsacaramel.png',
        name: 'Hồng Trà Sữa Caramel',
        price: 55000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/4136b3715bff3e-sachuaphcbntccamphclong.png',
        name: 'Sữa Chua Phúc Bồn Tử Đác Cam',
        price: 70000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/65a7d028c2229d-sachuaxoicthmphclong.png',
        name: 'Sữa Chua Xoài Đác Thơm',
        price: 70000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/90405a9f256f11-cafe5mon04.png',
        name: 'Cappuccino',
        price: 40000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/dae727e03e8092-daccam.png',
        name: 'Hồng Trà Đác Cam Đá Xay',
        price: 70000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/d1c388a9975c2c-hoatuyetberry60000838.png',
        name: 'Hoa Tuyết Berry Berry',
        price: 70000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/8a92bb4b37c012-cafe5mon01.png',
        name: 'Latte',
        price: 45000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/8ebb07f0eeccc1-resize_damdadunggu07.png',
        name: 'Phin Sữa Đá',
        price: 35000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/b8f1dd4d4f583c-dacthom.png',
        name: 'Trà Lài Đác Thơm',
        price: 50000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/7c8006f72742d8-trnhnphclong.png',
        name: 'Trà Nhãn Sen',
        price: 50000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/063555c21c4206-trviliphclong.png',
        name: 'Trà Vải Lài',
        price: 50000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/5a893da4cab487-trthomcphclong.png',
        name: 'Lucky Tea',
        price: 50000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/3c2d50a2c26783-hngtrsaphclongtrosaphclong.png',
        name: 'Hồng Trà Sữa',
        price: 40000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/fdf73d348ac963-cphvanilla.png',
        name: 'Vanilla Latte',
        price: 45000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/ad7f4b76f4b694-trsaphclongtrlongsaphclong.png',
        name: 'Trà Sữa Phúc Long',
        price: 40000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/5318362664d05b-trlongdu.png',
        name: 'Trà Ô Long Dâu',
        price: 50000,
         
 
      },
      {
        id_type: 1,
        image: 'https://phuclong.com.vn/uploads/dish/6242c5934eefec-trsaphclongtrlongsaphclong.png',
        name: 'Trà ÔLong Sữa',
        price: 45000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/16fe719b78fd67-anh_viber_20210127_153153.jpg',
        name: 'Mận Dẻo Gừng',
        price: 45000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/bb6c510fc498d1-anh_viber_20210127_153152.jpg',
        name: 'Gừng Nướng Mật Ong',
        price: 55000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/e8bf964785cc8f-anh_viber_20210127_153151.jpg',
        name: 'Nho Khô Úc - Hộp',
        price: 38000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/ea88d8bc85ea77-anh_viber_20210127_153150.jpg',
        name: 'Nho Khô Úc - Gói',
        price: 18000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/b380798cdac374-traicaytuoisaydeo.png',
        name: 'Trái Cây Tươi Sấy Dẻo',
        price: 31000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/3c54192a843ade-xoaisaydeo.png',
        name: 'Xoài Sấy Dẻo',
        price: 31000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/4435480ff2bcfb-thomsaydeo.png',
        name: 'Thơm Sấy Dẻo',
        price: 32000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/76ea674c025829-dudusaydeo.png',
        name: 'Đu Đủ Sấy Dẻo',
        price: 31000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/66767e9f99f891-hopdieutuoirangcui.png',
        name: 'Hạt Điều Rang Củi (Vỏ Lụa) - Lon',
        price: 77000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/dc98ac0043a59c-hatdieurangcuitoiot.png',
        name: 'Hạt Điều Rang Củi Tỏi Ớt - Gói',
        price: 25000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/fcabc67c04409a-hopdieutuoirangtoiot.png',
        name: 'Hạt Điều Rang Củi Tỏi Ớt - Lon',
        price: 74000,
         
 
      },
      {
        id_type: 2,
        image: 'https://phuclong.com.vn/uploads/dish/c8c9cb7c3aff7e-hatdieurangcui.png',
        name: 'Hạt Điều Rang Củi (Vỏ Lụa) - Gói',
        price: 27000,
         
 
      },
      {
        id_type: 3,
        image: 'https://phuclong.com.vn/uploads/dish/61b22d5643fc80-img_67711.png',
        name: 'Bánh Mì Phúc Long (M)',
        price: 35000,
         
 
      },
      {
        id_type: 3,
        image: 'https://phuclong.com.vn/uploads/dish/774b3f1fd9202e-greenteachocolatecake.png',
        name: 'Green Tea Choco Cake',
        price: 35000,
         
 
      },
      {
        id_type: 3,
        image: 'https://phuclong.com.vn/uploads/dish/a9686c8f36a908-passionpannacotta.png',
        name: 'Passion Panna Cotta',
        price: 35000,
         
 
     },
      {
        id_type: 3,
        image: 'https://phuclong.com.vn/uploads/dish/dd626a9639b006-tiramisumini.png',
        name: 'Tiramisu Mini',
        price: 35000,
         
 
      },
      {
        id_type: 3,
        image: 'https://phuclong.com.vn/uploads/dish/a1c4d22a41ec76-banhphap_0003s_0000_chocobuttercroissant.jpg',
        name: 'Butter Chocolate Croissant 30g',
        price: 22000,
         
 
      },
      {
        id_type: 3,
        image: 'https://phuclong.com.vn/uploads/dish/01b9696b860549-banhphap_0000s_0001_buttercroissant.jpg',
        name: 'Pure Butter Croissant 30g',
        price: 20000,
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
