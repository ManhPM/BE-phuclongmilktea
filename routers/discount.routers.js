const express = require("express");
const { getAllDiscount, createDiscount, updateDiscount } = require("../controllers/discount.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateType } = require("../middlewares/validates/checkCreate");
const discountRouter = express.Router();

discountRouter.get("/", authenticate, authorize(["Admin"]), getAllDiscount);
discountRouter.post("/create", authenticate, authorize(["Admin"]), createDiscount);
discountRouter.put("/update/:code", authenticate, authorize(["Admin"]), updateDiscount);

module.exports = {
    discountRouter,
}