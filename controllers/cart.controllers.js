const {
  Cart,
  Cart_detail,
  Item,
  Order,
  Order_detail,
  Store,
  Discount,
  Shipping_partner
} = require("../models");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

const getAllItemInCart = async (req, res) => {
  try {
    const itemList = await Item.sequelize.query(
      "SELECT CD.id_item, CD.id_cart, CD.quantity as amount, I.image, I.name, I.price FROM carts as C, cart_details as CD, items as I, accounts as A, customers as CU WHERE A.id_account = CU.id_account AND CU.id_customer = C.id_customer AND C.id_cart = CD.id_cart AND CD.id_item = I.id_item AND A.username = :username",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ itemList });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createItemInCart = async (req, res) => {
  const { id_item } = req.params;
  const { quantity } = req.body;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const isExist = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    if (isExist) {
      if (quantity) {
        if (quantity <= 0) {
          res.status(400).json({ message: "Số lượng phải lớn hơn 0!" });
        } else {
          isExist.quantity = isExist.quantity + quantity;
          await isExist.save();
          res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
        }
      } else {
        isExist.quantity = isExist.quantity + 1;
        await isExist.save();
        res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
      }
    } else {
      if (quantity) {
        await Cart_detail.create({
          id_item,
          id_cart: info[0].id_cart,
          quantity: quantity,
        });
        res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
      } else {
        await Cart_detail.create({
          id_item,
          id_cart: info[0].id_cart,
          quantity: 1,
        });
        res.status(201).json({ message: "Đã thêm vào giỏ hàng!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const updateItemInCart = async (req, res) => {
  const { id_item } = req.params;
  const { quantity } = req.body;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCart = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    if (quantity <= 0) {
      res.status(400).json({ message: "Số lượng phải lớn hơn 0!" });
    } else {
      itemInCart.quantity = quantity;
      await itemInCart.save();
      res.status(201).json({ message: "Điều chỉnh số lượng thành công!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Điều chỉnh số lượng thất bại!" });
  }
};

const increaseNumItemInCart = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCart = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    itemInCart.quantity = itemInCart.quantity + 1;
    await itemInCart.save();
    res.status(201).json({ message: "Số lượng đã tăng thêm 1!" });
  } catch (error) {
    res.status(500).json({ message: "Điều chỉnh số lượng thất bại!" });
  }
};

const getDeliFee = async (req, res) => {
  const { userLat, userLng, id_shipping_partner, id_store } = req.body;
  try {
    const store = await Store.findOne({
      where: {
        id_store
      }
    });
    const shipping_partner = await Shipping_partner.findOne({
      where: {
        id_shipping_partner
      }
    });
    const storeLat = store.storeLat;
    const storeLng = store.storeLng;
    let random = getDistanceFromLatLonInKm(
      userLat,
      userLng,
      storeLat,
      storeLng
    );
    if (random < 2) {
      random = shipping_partner.unit_price * 5;
    } else if (random >= 2 && random < 5) {
      random = shipping_partner.unit_price * 5 + 5000;
    } else if (random >= 5 && random < 10) {
      random = shipping_partner.unit_price * 5 + 10000;
    } else {
      random = random * shipping_partner.unit_price;
    }
    random = Math.ceil(random / 1000) * 1000;
    res.status(201).json({ delivery_fee: random });
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const decreaseNumItemInCart = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCart = await Cart_detail.findOne({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    if (itemInCart.quantity < 2) {
      await Cart_detail.destroy({
        where: {
          id_item,
          id_cart: info[0].id_cart,
        },
      });
      res.status(201).json({ message: "Đã xoá khỏi giỏ hàng!" });
    } else {
      itemInCart.quantity = itemInCart.quantity - 1;
      await itemInCart.save();
      res.status(201).json({ message: "Số lượng đã giảm đi 1!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Điều chỉnh số lượng thất bại!" });
  }
};

const deleteOneItemInCart = async (req, res) => {
  const { id_item } = req.params;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.* FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    await Cart_detail.destroy({
      where: {
        id_item,
        id_cart: info[0].id_cart,
      },
    });
    res.status(201).json({ message: "Đã xoá khỏi giỏ hàng!" });
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const checkout = async (req, res) => {
  const {
    id_payment,
    description,
    id_shipping_partner,
    userLat,
    userLng,
    code,
  } = req.body;
  try {
    const info = await Cart.sequelize.query(
      "SELECT C.*, CU.phone FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemInCartList = await Cart_detail.findAll({
      where: {
        id_cart: info[0].id_cart,
      },
    });
    if (itemInCartList.length){
      const store = await Cart.sequelize.query(
        "SELECT id_store, name, address, phone, email, storeLng, storeLat, 6371 * ACOS(COS(RADIANS(:userLng)) * COS(RADIANS(storeLat)) * COS(RADIANS(storeLng) - RADIANS(:userLat)) + SIN(RADIANS(:userLng)) * SIN(RADIANS(storeLat))) AS distance FROM stores ORDER BY distance ASC LIMIT 1",
        {
          replacements: { userLat: userLat, userLng: userLng },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const shipping_partner = await Shipping_partner.findOne({
        where: {
          id_shipping_partner
        }
      });
      const date = new Date();
      date.setHours(date.getHours() + 7);
      const storeLat = store[0].storeLat;
      const storeLng = store[0].storeLng;
      let random = getDistanceFromLatLonInKm(
        userLat,
        userLng,
        storeLat,
        storeLng
      );
      if (random < 2) {
        random = shipping_partner.unit_price * 5;
      } else if (random >= 2 && random < 5) {
        random = shipping_partner.unit_price * 5 + 5000;
      } else if (random >= 5 && random < 10) {
        random = shipping_partner.unit_price * 5 + 10000;
      } else {
        random = random * shipping_partner.unit_price;
      }
      random = Math.ceil(random / 1000) * 1000;
      const total = await Cart.sequelize.query(
        "SELECT SUM(CD.quantity*I.price) as item_fee FROM cart_details as CD, items as I WHERE I.id_item = CD.id_item AND CD.id_cart = :id_cart",
        {
          replacements: { id_cart: info[0].id_cart },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      if (code) {
        const discount = await Discount.findOne({
          where: {
            code,
          },
        });
        const cart = await Cart.sequelize.query(
          "SELECT SUM(quantity) as totalQuantity FROM cart_details WHERE id_cart = :id_cart",
          {
            replacements: { id_cart: info[0].id_cart },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        if (cart[0].totalQuantity >= discount.min_quantity) {
          discount.quantity = discount.quantity - 1;
          await discount.save();
          const newOrder = await Order.create({
            description,
            id_payment,
            delivery_fee: random,
            item_fee: Number(total[0].item_fee),
            total:Number(total[0].item_fee) - (Number(total[0].item_fee) * discount.discount_percent) / 100 + random,
            discount_fee:(Number(total[0].item_fee) * discount.discount_percent) / 100,
            time_order: date,
            id_customer: info[0].id_customer,
            id_shipping_partner,
            status: 0,
            id_store: store[0].id_store,
          });
          let i = 0;
          while (itemInCartList[i]) {
            await Order_detail.create({
              id_order: newOrder.id_order,
              id_item: itemInCartList[i].id_item,
              quantity: itemInCartList[i].quantity,
            });
            await Cart_detail.destroy({
              where: {
                id_item: itemInCartList[i].id_item,
                id_cart: itemInCartList[i].id_cart,
              },
            });
            i++;
          }
          res.status(201).json({ message: "Đặt hàng thành công!" });
        } else {
          res
            .status(400)
            .json({
              message: "Số lượng sản phẩm chưa đạt yêu cầu của mã giảm giá!",
            });
        }
      } else {
        const newOrder = await Order.create({
          description,
          id_payment,
          delivery_fee: random,
          item_fee: Number(total[0].item_fee),
          total: Number(total[0].item_fee) + random,
          time_order: date,
          id_customer: info[0].id_customer,
          id_shipping_partner,
          status: 0,
          id_store: store[0].id_store,
        });
        let i = 0;
        while (itemInCartList[i]) {
          await Order_detail.create({
            id_order: newOrder.id_order,
            id_item: itemInCartList[i].id_item,
            quantity: itemInCartList[i].quantity,
          });
          await Cart_detail.destroy({
            where: {
              id_item: itemInCartList[i].id_item,
              id_cart: itemInCartList[i].id_cart,
            },
          });
          i++;
        }
        res.status(201).json({ message: "Đặt hàng thành công!" });
      }
    } else {
      res.status(400).json({ message: "Giỏ hàng của bạn đang trống!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đặt hàng thất bại!" });
  }
};

const configPayment = require("../config/configpayment");
const stripe = require("stripe")(configPayment.SECRET_KEY);

const checkoutPayment = async (req, res) => {
  res.render("Home", {
    key: configPayment.PUBLISHABLE_KEY,
    name: "Phạm Minh Mạnh",
    amount: "150000",
  });
};

const checkoutPayment2 = async (req, res) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Tên khách hàng: Phạm Minh Mạnh",
      address: {
        country: "Việt Nam",
        line1:
          "D2/084B ấp Nam Sơn xã Quang Trung huyện Thống Nhất tỉnh Đồng Nai",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 150000,
        description: "Thanh toán hoá đơn đặt hàng",
        currency: "VND",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(charge);
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Hàm hỗ trợ tính khoảng cách
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  getAllItemInCart,
  updateItemInCart,
  createItemInCart,
  increaseNumItemInCart,
  decreaseNumItemInCart,
  deleteOneItemInCart,
  checkout,
  checkoutPayment,
  checkoutPayment2,
  getDeliFee
};
