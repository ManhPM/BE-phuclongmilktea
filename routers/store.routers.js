const express = require("express");
const {Store} = require("../models")
const { getAllStore, createStore, updateStore, updatePositionOfStore } = require("../controllers/store.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateStore } = require("../middlewares/validates/checkCreate");
const storeRouter = express.Router();

storeRouter.get("/", getAllStore);
storeRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateStore(Store), createStore);
storeRouter.put("/update/:id_store", authenticate, authorize(["Admin"]), updateStore);
storeRouter.put("/updateposition", authenticate, authorize(["Quản lý"]), updatePositionOfStore);

module.exports = {
    storeRouter,
}