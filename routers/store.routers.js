const express = require("express");
const { getAllStore, createStore, updateStore, updatePositionOfStore } = require("../controllers/store.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const storeRouter = express.Router();

storeRouter.get("/", getAllStore);
storeRouter.post("/create", authenticate, authorize(["Admin"]), createStore);
storeRouter.put("/update", authenticate, authorize(["Admin"]), updateStore);
storeRouter.put("/updateposition", authenticate, authorize(["Quản lý"]), updatePositionOfStore);

module.exports = {
    storeRouter,
}