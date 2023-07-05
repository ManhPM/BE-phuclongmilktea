const { Order, Order_detail, Item_store, Report, Report_detail, Account } = require("../models");
const { QueryTypes } = require("sequelize");

const dashboardManager = async (req, res) => {
  try {
    const staff = await Order.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
      const itemList = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT CONCAT(FORMAT((SUM(order_details.quantity)*items.price), 0)) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as total, I.name FROM items as I, order_details as OD, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store GROUP BY I.id_item ORDER BY sold DESC LIMIT 5",
        {
          replacements: { id_store: staff[0].id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const orderList = await Order_detail.sequelize.query(
        "SELECT O.id_order, O.status, C.name, C.phone, C.address, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner ORDER BY O.time_order ASC LIMIT 3",
        {
          replacements: { id_store: staff[0].id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );

      const info = await Order_detail.sequelize.query(
        "SELECT(SELECT COUNT(*) from orders WHERE orders.id_store = :id_store) as total, (SELECT COUNT(*) from orders WHERE orders.id_store = :id_store AND orders.status = 0) as un_confirm, (SELECT COUNT(*) from orders WHERE orders.id_store = :id_store AND orders.status = 4) as finished, (SELECT COUNT(*) from orders WHERE orders.id_store = :id_store AND orders.status = 2) as canceled, (SELECT COUNT(*) from orders WHERE orders.id_store = :id_store AND orders.status = 1) as confirmed, (SELECT COUNT(*) from orders WHERE orders.id_store = :id_store AND orders.status = 3) as delivering",
        {
          replacements: { id_store: staff[0].id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const date = new Date();
      date.setHours(date.getHours() + 7);
      const chart = await Order_detail.sequelize.query(
        `SELECT(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 1) as jan,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 2) as feb,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 3) as mar,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 4) as apr,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 5) as may,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 6) as jun,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 7) as jul,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 8) as aug,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 9) as sep,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 10) as oct,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 11) as nov,(SELECT COUNT(*) from orders WHERE id_store = :id_store AND status = 4 AND YEAR(time_order) = YEAR(current_date()) AND MONTH(time_order) = 12) as "dec"`,
        {
          replacements: { id_store: staff[0].id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const doanhThu = await Order_detail.sequelize.query(
        "SELECT (SELECT IFNULL(CONCAT(FORMAT(SUM(O.item_fee), 0)),0) FROM orders AS O WHERE O.status = 4 AND O.id_store = 1 AND DAY(O.time_order) = DAY(current_date())) as totalDay, (SELECT IFNULL(CONCAT(FORMAT(SUM(O.item_fee), 0)),0) FROM orders AS O WHERE O.status = 4 AND O.id_store = 1 AND MONTH(O.time_order) = MONTH(current_date())) as totalMonth,(SELECT COUNT(*) FROM orders AS O WHERE O.status = 4 AND O.id_store = 1 AND DAY(O.time_order) = DAY(current_date())) as countOrderDay,(SELECT COUNT(*) FROM orders AS O WHERE O.status = 4 AND O.id_store = 1 AND MONTH(O.time_order) = MONTH(current_date())) as countOrderMonth",
        {
          replacements: { id_store: staff[0].id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({orderList, itemList, info:info[0], chart:chart[0], revenue:doanhThu[0]});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllOrder = async (req, res) => {
  const {id_order, status} = req.query
  const account = await Account.findOne({
    where: {
      username: req.username
    }
  })
  try {
    if (account.id_role == 1) {
      //US
      const customer = await Order.sequelize.query(
        "SELECT CU.* FROM customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      if(status){
        if(id_order){
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, O.delivery_fee, O.discount_fee, O.item_fee, O.total, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order FROM orders as O WHERE O.id_customer = :id_customer AND O.status = :status AND O.id_order = :id_order",
            {
              replacements: { id_customer: customer[0].id_customer, status, id_order },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
        else{
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, O.delivery_fee, O.discount_fee, O.item_fee, O.total, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order FROM orders as O WHERE O.id_customer = :id_customer AND O.status = :status",
            {
              replacements: { id_customer: customer[0].id_customer, status },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
      }
      else{
        if(id_order){
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, O.delivery_fee, O.discount_fee, O.item_fee, O.total, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order FROM orders as O WHERE O.id_customer = :id_customer AND O.id_order = :id_order",
            {
              replacements: { id_customer: customer[0].id_customer, id_order },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
        else{
          const orderList = await Order.sequelize.query(
            "SELECT O.id_order, O.delivery_fee, O.discount_fee, O.item_fee, O.total, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order FROM orders as O WHERE O.id_customer = :id_customer ORDER BY O.status DESC",
            {
              replacements: { id_customer: customer[0].id_customer },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
      }
    } else if (staff[0].id_role == 5) {
      const staff = await Order.sequelize.query(
        "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      //AD
      if(status){
        if(id_order){
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status = :status AND O.id_order = :id_order AND O.id_store = :id_store",
            {
              replacements: { status, id_order, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
        else{
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status = :status AND O.id_store = :id_store",
            {
              replacements: { status, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
      }
      else{
        if(id_order){
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_order = :id_order AND O.id_store = :id_store",
            {
              replacements: { id_order, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
        else{
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_store = :id_store ORDER BY O.status ASC",
            {
              replacements: { id_order, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
      }
    } 
    else if (staff[0].id_role == 3 || staff[0].id_role == 2) {
      const staff = await Order.sequelize.query(
        "SELECT S.*, A.id_role FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      // NV
      if(status){
        if(id_order){
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status = :status AND O.id_order = :id_order AND O.id_store = :id_store",
            {
              replacements: { id_order, status, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
        else{
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status = :status AND O.id_store = :id_store ORDER BY O.time_order DESC, O.status ASC",
            {
              replacements: { status, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
      }
      else{
        if(id_order){
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_order = :id_order AND O.id_store = :id_store",
            {
              replacements: { id_order, id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
        else{
          const orderList = await Order.sequelize.query(
            "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_store = :id_store ORDER BY O.time_order DESC, O.status ASC",
            {
              replacements: { id_store: staff[0].id_store },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ orderList });
        }
      }
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
        "SELECT O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.address, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P, shippers AS S WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.status != 1 AND O.status != 2 AND O.status != 0 AND O.id_shipping_partner = S.id_shipping_partner AND O.id_shipper = :id_shipper ORDER BY O.time_order DESC",
        {
          replacements: { id_shipper: shipper[0].id_shipper },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ orderList });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
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
      "SELECT DISTINCT O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.phone, C.address, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P, shippers as S WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_shipping_partner = :id_shipping_partner AND O.status = 1 GROUP BY O.id_order ORDER BY O.time_order DESC",
      {
        replacements: { id_shipping_partner: shipper[0].id_shipping_partner },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ itemList });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
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
    const shipper = await Order.sequelize.query(
      "SELECT S.* FROM shippers as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (order.status == 1) {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      order.id_shipper = shipper[0].id_shipper;
      order.time_shipper_receive = date;
      order.status = 3;
      await order.save();
      res.status(200).json({ message: "Nhận đơn thành công!" });
    } else if (order.status == 3) {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      order.time_shipper_delivered = date;
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
    const order = await Order.sequelize.query(
      "SELECT (SELECT name FROM shippers WHERE id_shipper = O.id_shipper) as name_shipper, (SELECT name FROM shipping_partners WHERE id_shipping_partner = O.id_shipping_partner) as name_shipping_partner, O.id_order, O.delivery_fee, O.item_fee, O.total, C.name as name_customer, C.address, C.phone, O.description, O.status, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, P.name as name_payment FROM orders as O, customers as C, payment_methods as P WHERE O.id_customer = C.id_customer AND O.id_payment = P.id_payment AND O.id_order = :id_order",
      {
        replacements: { id_order: id_order },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ info: order[0], itemList });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
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
      const staff = await Order.sequelize.query(
        "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      let i = 0;
      let check = 0;
      while (itemListInOrder[i]) {
        const itemOfStore = await Item_store.findOne({
          where: {
            id_item: itemListInOrder[i].id_item,
            id_store: staff[0].id_store,
          },
        });
        if (itemOfStore.quantity >= itemListInOrder[i].quantity) {
          i++;
        } else {
          check = 1;
          break;
        }
      }
      if (check == 0) {
        let j = 0;
        while (itemListInOrder[j]) {
          await Order.sequelize.query(
            "UPDATE item_stores SET quantity = quantity - (:quantity) WHERE id_item = :id_item AND id_store = :id_store",
            {
              replacements: {
                id_item: itemListInOrder[j].id_item,
                quantity: itemListInOrder[j].quantity,
                id_store: staff[0].id_store,
              },
              type: QueryTypes.UPDATE,
              raw: true,
            }
          );
          j++;
        }
        order.status = 1;
        await order.save();
        res.status(201).json({ message: "Xác nhận đơn hàng!" });
      } else {
        res
          .status(400)
          .json({ message: "Số lượng sản phẩm không đủ. Không thể nhận đơn!" });
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
        .json({
          message: "Thao tác thất bại. Đơn hàng đã được xác nhận hoặc đã huỷ!",
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Thao tác thất bại!" });
  }
};

const thongKeSanPham = async (req, res) => {
  const { tuNgay, denNgay } = req.query;
  try {
    const staff = await Order.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (tuNgay && denNgay) {
      // Thống kê từ ngày tuNgay đến ngày denNgay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0 AND orders.time_order BETWEEN :tuNgay AND :denNgay) as sold, (SELECT (SUM(order_details.quantity)*items.price) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0 AND orders.time_order BETWEEN :tuNgay AND :denNgay) as total, I.*, T.name AS name_type FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store AND O.time_order BETWEEN :tuNgay AND :denNgay GROUP BY I.id_item ORDER BY sold DESC",
        {
          replacements: {
            tuNgay: `${tuNgay}`,
            denNgay: `${denNgay}`,
            id_store: staff[0].id_store,
          },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ itemList: thongKe });
    } else {
      // Thống kê từ trước đến nay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as total, I.*, T.name AS name_type FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store GROUP BY I.id_item ORDER BY sold DESC",
        {
          replacements: { id_store: staff[0].id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ itemList: thongKe });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createReport = async (req, res) => {
  try {
    const staff = await Order.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const date = new Date();
    date.setHours(date.getHours() + 7);
    const itemList = await Order_detail.sequelize.query(
      "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as total, I.id_item FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store GROUP BY I.id_item ORDER BY sold DESC",
      {
        replacements: { id_store: staff[0].id_store },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const doanhThu = await Order_detail.sequelize.query(
      "SELECT DISTINCT SUM((SELECT (SUM(order_details.quantity)*items.price) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0)) as total, (SELECT COUNT(*) FROM orders WHERE orders.id_store = :id_store AND orders.id_order = O.id_order) as countOrder FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store GROUP BY I.id_item",
      {
        replacements: { id_store: staff[0].id_store },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const report = await Report.create({
      id_store: staff[0].id_store,
      revenue: doanhThu[0].total,
      date,
      countOrder: doanhThu[0].countOrder
    });
    let i = 0;
    while(itemList[i]){
      await Report_detail.create({
        id_report: report.id_report,
        id_item: itemList[i].id_item,
        sold: itemList[i].sold,
        total: itemList[i].total
      });
      i++;
    }
    res.status(200).json({ message: "Tạo mới báo cáo thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const thongKeDonHang = async (req, res) => {
  const { tuNgay, denNgay, status } = req.query;
  try {
    const staff = await Order.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (tuNgay && denNgay) {
      if (status) {
        // Thống kê từ ngày tuNgay đến ngày denNgay với status
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.time_order BETWEEN :tuNgay AND :denNgay AND O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner AND O.status = :status",
          {
            replacements: {
              tuNgay: `${tuNgay}`,
              denNgay: `${denNgay}`,
              status: status,
              id_store: staff[0].id_store,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({
          orderList,
        });
      } else {
        // Thống kê từ ngày tuNgay đến ngày denNgay
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.time_order BETWEEN :tuNgay AND :denNgay AND O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner",
          {
            replacements: {
              tuNgay: `${tuNgay}`,
              denNgay: `${denNgay}`,
              id_store: staff[0].id_store,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      }
    } else {
      // Thống kê từ trước đến nay
      if (status) {
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner AND O.status = :status",
          {
            replacements: { status: status, id_store: staff[0].id_store },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      } else {
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner",
          {
            replacements: { id_store: staff[0].id_store },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const thongKeSanPhamAdmin = async (req, res) => {
  const { tuNgay, denNgay, id_store } = req.query;
  try {
    if (tuNgay && denNgay) {
      // Thống kê từ ngày tuNgay đến ngày denNgay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0 AND orders.time_order BETWEEN :tuNgay AND :denNgay) as sold, (SELECT (SUM(order_details.quantity)*items.price) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0 AND orders.time_order BETWEEN :tuNgay AND :denNgay) as total, I.*, T.name AS name_type FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store AND O.time_order BETWEEN :tuNgay AND :denNgay GROUP BY I.id_item ORDER BY sold DESC",
        {
          replacements: {
            tuNgay: `${tuNgay}`,
            denNgay: `${denNgay}`,
            id_store: id_store,
          },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ itemList: thongKe });
    } else {
      // Thống kê từ trước đến nay
      const thongKe = await Order_detail.sequelize.query(
        "SELECT (SELECT SUM(order_details.quantity) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as sold, (SELECT (SUM(order_details.quantity)*items.price) FROM items, order_details, orders where order_details.id_item = I.id_item AND order_details.id_order = orders.id_order AND orders.status = 4 AND orders.id_store = :id_store AND order_details.id_item = items.id_item AND items.status != 0) as total, I.*, T.name AS name_type FROM items as I, order_details as OD, types as T, orders as O WHERE OD.id_item = I.id_item AND O.id_order = OD.id_order AND T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND O.status = 4 AND O.id_store = :id_store GROUP BY I.id_item ORDER BY sold DESC",
        {
          replacements: { id_store: id_store },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(200).json({ itemList: thongKe });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const thongKeDonHangAdmin = async (req, res) => {
  const { tuNgay, denNgay, status, id_store } = req.query;
  try {
    if (tuNgay && denNgay) {
      if (status) {
        // Thống kê từ ngày tuNgay đến ngày denNgay với status
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.time_order BETWEEN :tuNgay AND :denNgay AND O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner AND O.status = :status",
          {
            replacements: {
              tuNgay: `${tuNgay}`,
              denNgay: `${denNgay}`,
              status: status,
              id_store: id_store,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({
          orderList,
        });
      } else {
        // Thống kê từ ngày tuNgay đến ngày denNgay
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.time_order BETWEEN :tuNgay AND :denNgay AND O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner",
          {
            replacements: {
              tuNgay: `${tuNgay}`,
              denNgay: `${denNgay}`,
              id_store: id_store,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      }
    } else {
      // Thống kê từ trước đến nay
      if (status) {
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner AND O.status = :status",
          {
            replacements: { status: status, id_store: id_store },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
      } else {
        const orderList = await Order_detail.sequelize.query(
          "SELECT O.id_order, SP.name as name_shipping_partner, O.total, O.item_fee, O.delivery_fee, DATE_FORMAT(O.time_order, '%d/%m/%Y %H:%i') as time_order, DATE_FORMAT(O.time_confirm, '%d/%m/%Y %H:%i') as time_confirm, DATE_FORMAT(O.time_shipper_receive, '%d/%m/%Y %H:%i') as time_shipper_receive, DATE_FORMAT(O.time_shipper_delivered, '%d/%m/%Y %H:%i') as time_shipper_delivered, O.description, O.status, P.name as name_payment, C.name as name_customer FROM orders as O, customers as C, payment_methods as P, shipping_partners as SP WHERE O.id_store = :id_store AND O.id_payment = P.id_payment AND O.id_customer = C.id_customer AND O.id_shipping_partner = SP.id_shipping_partner",
          {
            replacements: { id_store: id_store },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        res.status(200).json({ orderList });
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
  thongKeDonHangAdmin,
  thongKeSanPhamAdmin,
  createReport,
  dashboardManager
};
