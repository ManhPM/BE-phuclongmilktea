const express = require("express");
const { getAllType } = require("../controllers/type.controllers.js");
const typeRouter = express.Router();

typeRouter.get("/", getAllType);

module.exports = {
    typeRouter,
}