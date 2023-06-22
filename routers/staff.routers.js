const express = require("express");
const { getAllStaff, createStaff, updateStaff, getDetailStaff } = require("../controllers/staff.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateEmail } = require("../middlewares/validates/checkCreate.js");
const staffRouter = express.Router();

staffRouter.get("/", authenticate, authorize(["Admin"]), getAllStaff);
staffRouter.get("/detail/:id_staff", authenticate, authorize(["Admin"]), getDetailStaff);
staffRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateEmail, createStaff);
staffRouter.put("/update/:id_staff", authenticate, authorize(["Admin"]), updateStaff);

module.exports = {
    staffRouter,
}