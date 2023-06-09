const express = require("express");
const {Shipping_partner} = require("../models")
const { getAllShippingPartner, createShippingPartner, updateShippingPartner } = require("../controllers/shippingpartner.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateShippingPartner } = require("../middlewares/validates/checkCreate.js");
const shippingPartnerRouter = express.Router();

shippingPartnerRouter.get("/", getAllShippingPartner);
shippingPartnerRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateShippingPartner(Shipping_partner), createShippingPartner);
shippingPartnerRouter.put("/update/:id_shipping_partner", authenticate, authorize(["Admin"]), updateShippingPartner);

module.exports = {
    shippingPartnerRouter,
}