const express = require("express");
const {Order} = require("../models")
const {getAllItemInCart, createItemInCart, checkout, deleteOneItemInCart, increaseNumItemInCart, decreaseNumItemInCart, updateItemInCart, checkoutPayment, checkoutPayment2, getDeliFee } = require("../controllers/cart.controllers");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkPhoneCheckout, checkDiscountCode, checkUnConfirmedOrder } = require("../middlewares/validates/checkCreate");
const cartRouter = express.Router();

cartRouter.get("/", authenticate, authorize(["Khách hàng"]), getAllItemInCart);
cartRouter.get("/getdelifee", getDeliFee);
cartRouter.post("/add/:id_item", authenticate, authorize(["Khách hàng"]), createItemInCart);
cartRouter.post("/update/:id_item", authenticate, authorize(["Khách hàng"]), updateItemInCart);
cartRouter.post("/checkout", authenticate, authorize(["Khách hàng"]), checkUnConfirmedOrder(Order), checkPhoneCheckout, checkDiscountCode, checkout);
cartRouter.delete("/remove/:id_item", authenticate, authorize(["Khách hàng"]), deleteOneItemInCart);
cartRouter.post("/decrease/:id_item", authenticate, authorize(["Khách hàng"]), decreaseNumItemInCart);
cartRouter.post("/increase/:id_item", authenticate, authorize(["Khách hàng"]), increaseNumItemInCart);



module.exports = {
    cartRouter,
}