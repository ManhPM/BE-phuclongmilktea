const express = require("express");
const {Payment_method} = require("../models")
const { getAllPaymentMethod, createPaymentMethod, updatePaymentMethod, getDetailPaymentMethod } = require("../controllers/payment.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreatePayment } = require("../middlewares/validates/checkCreate.js");
const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentMethod);
paymentRouter.get("/detail/:id_payment", authenticate, authorize(["Admin"]), getDetailPaymentMethod);
paymentRouter.post("/create", authenticate, authorize(["Admin"]), checkCreatePayment(Payment_method), createPaymentMethod);
paymentRouter.put("/update/:id_payment", authenticate, authorize(["Admin"]), updatePaymentMethod);

module.exports = {
    paymentRouter,
}