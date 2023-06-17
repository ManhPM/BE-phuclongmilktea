const express = require("express");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { getAllItemInOrder, getAllOrder, confirmOrder, cancelOrder, thongKeSanPham, thongKeDonHang, getAllOrderForShipper, receiveOrder, thongKeSanPhamAdmin, thongKeDonHangAdmin, createReport } = require("../controllers/order.controllers");
const orderRouter = express.Router();

orderRouter.get("/", authenticate, getAllOrder);
orderRouter.get("/ship", authenticate, authorize(["Shipper"]), getAllOrderForShipper);
orderRouter.post("/report", authenticate, authorize(["Quản lý"]), createReport);
orderRouter.get("/receive/:id_order", authenticate, authorize(["Shipper"]), receiveOrder);
orderRouter.get("/detail/:id_order", getAllItemInOrder);
orderRouter.get("/confirm/:id_order", authenticate, authorize(["Nhân viên"]), confirmOrder);
orderRouter.get("/cancel/:id_order", authenticate, authorize(["Nhân viên","Khách hàng"]), cancelOrder);
orderRouter.get("/thongkesanpham", authenticate, authorize(["Quản lý"]), thongKeSanPham);
orderRouter.get("/thongkedonhang", authenticate, authorize(["Quản lý"]), thongKeDonHang);
orderRouter.get("/thongkesanpham/admin", authenticate, authorize(["Admin"]), thongKeSanPhamAdmin);
orderRouter.get("/thongkedonhang/admin", authenticate, authorize(["Admin"]), thongKeDonHangAdmin);


module.exports = {
    orderRouter,
}