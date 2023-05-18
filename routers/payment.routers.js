const express = require("express");
const { getAllPaymentMethod } = require("../controllers/payment.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentMethod);

module.exports = {
    paymentRouter,
}