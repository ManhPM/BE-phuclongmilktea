const express = require("express");
const { getAllProvider, createProvider, updateProvider } = require("../controllers/provider.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const providerRouter = express.Router();

providerRouter.get("/", getAllProvider);
providerRouter.post("/create", authenticate, authorize(["Admin"]), createProvider);
providerRouter.put("/update", authenticate, authorize(["Admin"]), updateProvider);


module.exports = {
    providerRouter,
}