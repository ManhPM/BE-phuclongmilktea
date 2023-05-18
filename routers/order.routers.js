const express = require("express");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { getAllItemInOrder, getAllOrder, confirmOrder, cancelOrder, thongKeSanPham, thongKeDonHang, getAllOrderForShipper, receiveOrder } = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/", authenticate, getAllOrder);
orderRouter.get("/ship", authenticate, authorize(["Shipper"]), getAllOrderForShipper);
orderRouter.get("/receive/:id_order", authenticate, authorize(["Shipper"]), receiveOrder);
orderRouter.get("/detail/:id_order", getAllItemInOrder);
orderRouter.get("/confirm/:id_order", authenticate, authorize(["Nhân viên"]), confirmOrder);
orderRouter.get("/cancel/:id_order", authenticate, authorize(["Nhân viên","Khách hàng"]), cancelOrder);
orderRouter.get("/thongkesanpham", authenticate, authorize(["Admin"]), thongKeSanPham);
orderRouter.get("/thongkedonhang", authenticate, authorize(["Admin"]), thongKeDonHang);


module.exports = {
    orderRouter,
}