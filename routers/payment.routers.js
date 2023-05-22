const express = require("express");
const { getAllPaymentMethod, createPaymentMethod, updatePaymentMethod } = require("../controllers/payment.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentMethod);
paymentRouter.post("/create", authenticate, authorize(["Admin"]), createPaymentMethod);
paymentRouter.put("/update", authenticate, authorize(["Admin"]), updatePaymentMethod);

module.exports = {
    paymentRouter,
}