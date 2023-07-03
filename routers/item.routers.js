const express = require("express");
const {Item} = require("../models")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const {getAllItem, getDetailItem, createItem, updateItem, deleteItem, get3ItemsEachType, getItems, processingItem, getTopping, getAllItemInStore} = require("../controllers/item.controllers");
const { checkCreateItem, checkItemValue } = require("../middlewares/validates/checkCreate.js");
const itemRouter = express.Router();

itemRouter.get("/page/:page", getAllItem);
itemRouter.get("/store/page/:page", authenticate, getAllItemInStore);
itemRouter.get("/store", authenticate, authorize(["Quản lý","Nhân viên"]), getAllItemInStore);
itemRouter.get("/", getAllItem);
itemRouter.get("/get", getItems);
itemRouter.get("/topping", getTopping);
itemRouter.get("/category", get3ItemsEachType);
itemRouter.get("/detail/:id_item", getDetailItem);
itemRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateItem(Item), checkItemValue(Item), createItem);
itemRouter.put("/update/:id_item", authenticate, authorize(["Admin"]), checkItemValue(Item), checkCreateItem(Item), updateItem);
itemRouter.delete("/delete/:id_item", authenticate, authorize(["Admin"]), deleteItem);
itemRouter.post("/:id_item", authenticate, authorize(["Nhân viên"]), processingItem);

module.exports = {
    itemRouter,
}