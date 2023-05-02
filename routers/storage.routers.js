const express = require("express");
const { getAllStorage } = require("../controllers/storage.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const storageRouter = express.Router();

storageRouter.get("/", getAllStorage);

module.exports = {
    storageRouter,
}