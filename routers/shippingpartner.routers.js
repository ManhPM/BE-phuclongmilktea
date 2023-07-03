const express = require("express");
const {Shipping_partner} = require("../models")
const { getAllShippingPartner, createShippingPartner, updateShippingPartner, getDetailShippingPartner } = require("../controllers/shippingpartner.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateShippingPartner, checkValueShippingPartner } = require("../middlewares/validates/checkCreate.js");
const shippingPartnerRouter = express.Router();

shippingPartnerRouter.get("/", getAllShippingPartner);
shippingPartnerRouter.get("/detail/:id_shipping_partner", authenticate, authorize(["Admin"]), getDetailShippingPartner);
shippingPartnerRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateShippingPartner(Shipping_partner), checkValueShippingPartner, createShippingPartner);
shippingPartnerRouter.put("/update/:id_shipping_partner", authenticate, authorize(["Admin"]), checkCreateShippingPartner(Shipping_partner), updateShippingPartner);

module.exports = {
    shippingPartnerRouter,
}