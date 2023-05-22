const express = require("express");
const {Provider} = require("../models")
const { getAllProvider, createProvider, updateProvider } = require("../controllers/provider.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateProvider } = require("../middlewares/validates/checkCreate");
const providerRouter = express.Router();

providerRouter.get("/", getAllProvider);
providerRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateProvider(Provider), createProvider);
providerRouter.put("/update/:id_provider", authenticate, authorize(["Admin"]), updateProvider);


module.exports = {
    providerRouter,
}