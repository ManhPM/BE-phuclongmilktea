const { Item, Order, Order_detail } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllOrder = async (req, res) => {
  try {
    const info = await Order.sequelize.query(
      "SELECT R.id_role FROM roles as R, accounts as A WHERE A.username = :username AND A.id_role = R.id_role",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (info[0].id_role == 1) {
      //US
      const customer = await Order.sequelize.query(
        "SELECT CU.* FROM customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const orderList = await Order.sequelize.query(
        "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_expected, '%d/%m/%Y %H:%i') as time_expected, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_customer = :id_customer",
        {
          replacements: { id_customer: customer[0].id_customer },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ orderList });
    } else if (info[0].id_role == 2) {
      //AD
      const { status } = req.query;
      if (status) {
        const orderList = await Order.sequelize.query(
          "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_expected, '%d/%m/%Y %H:%i') as time_expected, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status = :status",
          {
            replacements: { status: status },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      } else {
        const orderList = await Order.sequelize.query(
          "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_expected, '%d/%m/%Y %H:%i') as time_expected, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment",
          {
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      }
    } else if (info[0].id_role == 3) {
      // NV
      const orderList = await Order.sequelize.query(
        "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_expected, '%d/%m/%Y %H:%i') as time_expected, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment ORDER BY O.time_order DESC, O.status ASC",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ orderList });
    } else {
      // SP
      const shipper = await Order.sequelize.query(
        "SELECT S.* FROM shippers as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const orderList = await Order.sequelize.query(
        "SELECT O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_expected, '%d/%m/%Y %H:%i') as time_expected, P.name as name_payment FROM orders as O, customers as C, payment_methods as P, shippers AS S WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status != 1 AND O.status != 2 AND O.status != 0 AND O.id_shipping_partner = S.id_shipping_partner AND O.id_shipper = :id_shipper ORDER BY O.time_order DESC",
        {
          replacements: { id_shipper: shipper[0].id_shipper },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ orderList });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllOrderForShipper = async (req, res) => {
  try {
    const shipper = await Order.sequelize.query(
      "SELECT S.* FROM shippers as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemList = await Order.sequelize.query(
      "SELECT DISTINCT O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_expected, '%d/%m/%Y %H:%i') as time_expected, P.name as name_payment FROM orders as O, customers as C, payment_methods as P, shippers as S WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_shipping_partner = :id_shipping_partner AND O.status = 1 GROUP BY O.id_order ORDER BY O.time_order DESC",
      {
        replacements: { id_shipping_partner: shipper[0].id_shipping_partner },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ itemList });
  } catch (error) {
    res.status(500).json(error);
  }
};

const receiveOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    if (order.status == 1) {
      const shipper = await Order.sequelize.query(
        "SELECT S.* FROM shippers as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const date = new Date();
      date.setMinutes(date.getMinutes() + 450);
      order.id_shipper = shipper[0].id_shipper;
      order.time_expected = date;
      order.status = 3;
      await order.save();
      res.status(200).json({ message: "Nhận đơn thành công!" });
    } else if(order.status == 3) {
      order.status = 4;
      await order.save();
      res.status(200).json({ message: "Đơn hàng giao thành công!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllItemInOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const itemList = await Order.sequelize.query(
      "SELECT OD.*, I.image, I.name, I.price, (I.price*OD.quantity) as amount FROM orders as O, order_details as OD, items as I WHERE O.id_order = OD.id_order AND OD.id_item = I.id_item AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ itemList });
  } catch (error) {
    res.status(500).json(error);
  }
};

const confirmOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    if (order.status == 0) {
      const itemListInOrder = await Order_detail.findAll({
        where: {
          id_order,
        },
      });
      let i = 0;
      let check = 0;
      let j = 0;
      while (itemListInOrder[i]) {
        const updateQuantity = await Item.findOne({
          where: {
            id_item: itemListInOrder[i].id_item,
          },
        });
        if (updateQuantity.quantity >= itemListInOrder[i].quantity) {
          i++;
        } else {
          check = 1;
          break;
        }
      }
      if(check == 0){
        while (itemListInOrder[j]) {
          const updateQuantity = await Item.findOne({
            where: {
              id_item: itemListInOrder[i].id_item,
            },
          });
            updateQuantity.quantity =
              updateQuantity.quantity - itemListInOrder[i].quantity;
            await updateQuantity.save();
            j++;
        }
        order.status = 1;
        await order.save();
        res.status(201).json({ message: "Xác nhận đơn hàng!" });
      }
      else {
        order.status = 2;
        await order.save();
        res.status(400).json({ message: "Số lượng không đủ. Tự động huỷ đơn!" });
      }
      
    } else {
      res
        .status(400)
        .json({ message: "Thao tác thất bại. Đơn hàng đã được xác nhận!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const cancelOrder = async (req, res) => {
  const { id_order } = req.params;
  try {
    const order = await Order.findOne({
      where: {
        id_order,
      },
    });
    if (order.status == 0) {
      order.status = 2;
      await order.save();
      res.status(200).json({ message: "Đơn hàng đã được huỷ bỏ!" });
    } else {
      res
        .status(400)
        .json({ message: "Thao tác thất bại. Đơn hàng đã được xác nhận!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};
const thongKeSanPham = async (req, res) => {
  const { tuNgay, denNgay } = req.query;
  try {
    if (tuNgay && denNgay) {
      // Thống kê từ ngày tuNgay đến ngày denNgay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) as total FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as total, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 AND O.datetime BETWEEN :tuNgay AND :denNgay GROUP BY I.id_item ORDER BY sold DESC",
        {
          replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const info = await Order_detail.sequelize.query(
        "SELECT SUM((SELECT SUM(quantity*I.price) FROM order_details WHERE id_order = O.id_order AND id_item = OD.id_item)) as total FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 AND O.datetime between :tuNgay AND :denNgay",
        {
          replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );

      res.status(200).json({ total: info[0].total, itemList: thongKe });
    } else {
      // Thống kê từ trước đến nay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) as total FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 1 AND order_details.id_item = items.id_item AND items.status != 0) as total, I.*, T.name AS name_type, (SELECT ROUND(AVG(R.rating) * 2, 0) / 2 FROM reviews AS R WHERE R.id_item = I.id_item) as rating FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1 GROUP BY I.id_item ORDER BY sold DESC",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const info = await Order_detail.sequelize.query(
        "SELECT SUM((SELECT SUM(quantity*I.price) FROM order_details WHERE id_order = O.id_order AND id_item = OD.id_item)) as total FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND I.status != 0 AND O.status = 1",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ total: info[0].total, itemList: thongKe });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const thongKeDonHang = async (req, res) => {
  const { tuNgay, denNgay, status } = req.query;
  try {
    if (tuNgay && denNgay) {
      if (status) {
        // Thống kê từ ngày tuNgay đến ngày denNgay với status
        const info = await Order_detail.sequelize.query(
          "SELECT COUNT(O.id_order) as countOrder, (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = :status AND I.status != 0 AND O.datetime BETWEEN :tuNgay AND :denNgay) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = :status AND O.datetime BETWEEN :tuNgay AND :denNgay GROUP BY OD.id_item) as countItem) as countItem FROM orders as O WHERE O.datetime BETWEEN :tuNgay AND :denNgay AND O.status = :status",
          {
            replacements: {
              tuNgay: `${tuNgay}`,
              denNgay: `${denNgay}`,
              status: status,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payments as P WHERE O.datetime BETWEEN :tuNgay AND :denNgay AND O.status = :status AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer",
          {
            replacements: {
              tuNgay: `${tuNgay}`,
              denNgay: `${denNgay}`,
              status: status,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({
          countOrder: info[0].countOrder,
          total: info[0].total,
          countItem: info[0].countItem,
          orderList,
        });
      } else {
        // Thống kê từ ngày tuNgay đến ngày denNgay
        const info = await Order_detail.sequelize.query(
          "SELECT DISTINCT (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = 1 AND I.status != 0 AND O.datetime BETWEEN  :tuNgay AND :denNgay) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = 1 AND O.datetime BETWEEN  :tuNgay AND :denNgay GROUP BY OD.id_item) as countItem) as countItem, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.datetime between :tuNgay AND :denNgay) as countOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 1 AND O.datetime between  :tuNgay AND :denNgay) as countConfirmedOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 2 AND O.datetime between  :tuNgay AND :denNgay) AS countCancelOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 0 AND O.datetime between  :tuNgay AND :denNgay) AS countUnConfirmedOrder FROM orders as O WHERE O.status = 1",
          {
            replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payments as P WHERE O.datetime BETWEEN :tuNgay AND :denNgay AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer",
          {
            replacements: { tuNgay: `${tuNgay}`, denNgay: `${denNgay}` },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ info: info[0], orderList });
      }
    } else {
      // Thống kê từ trước đến nay
      if (status) {
        const info = await Order_detail.sequelize.query(
          "SELECT COUNT(O.id_order) as countOrder, (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = :status AND I.status != 0) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = :status GROUP BY OD.id_item) as countItem) as countItem FROM orders as O WHERE O.datetime AND O.status = :status",
          {
            replacements: { status: status },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payments as P WHERE O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.status = :status",
          {
            replacements: { status: status },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ info: info[0], orderList });
      } else {
        const info = await Order_detail.sequelize.query(
          "SELECT (SELECT SUM(OD.quantity*I.price) as total FROM order_details as OD, orders as O, items as I WHERE O.id_order = OD.id_order AND I.id_item = OD.id_item AND O.status = 1 AND I.status != 0) as total, (SELECT COUNT(*) FROM (SELECT COUNT(OD.id_item) FROM order_details as OD, orders as O WHERE O.id_order = OD.id_order AND O.status = 1 GROUP BY OD.id_item) as countItem) as countItem, (SELECT COUNT(O.id_order) FROM orders as O) as countOrder, COUNT(O.id_order) as countConfirmedOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 2) AS countCancelOrder, (SELECT COUNT(O.id_order) FROM orders as O WHERE O.status = 0) AS countUnConfirmedOrder FROM orders as O WHERE O.status = 1",
          {
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, DATE_FORMAT(O.datetime, '%d/%m/%Y %H:%i') as datetime, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payments as P WHERE O.id_payment = P.id_payment AND O.id_customer = C.id_customer",
          {
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ info: info[0], orderList });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
  getAllOrder,
  getAllItemInOrder,
  getAllOrderForShipper,
  confirmOrder,
  cancelOrder,
  receiveOrder,
  thongKeSanPham,
  thongKeDonHang,
};
