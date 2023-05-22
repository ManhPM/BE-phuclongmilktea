const express = require("express");
const { getAllType, createType, updateType } = require("../controllers/type.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const typeRouter = express.Router();

typeRouter.get("/", getAllType);
typeRouter.post("/create", authenticate, authorize(["Admin"]), createType);
typeRouter.put("/update", authenticate, authorize(["Admin"]), updateType);

module.exports = {
    typeRouter,
}