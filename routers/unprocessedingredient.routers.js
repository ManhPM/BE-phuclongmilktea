const express = require("express");
const { getAllProvider } = require("../controllers/provider.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const providerRouter = express.Router();

providerRouter.get("/", getAllProvider);

module.exports = {
    providerRouter,
}