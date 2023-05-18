const express = require("express");
const { getAllUnprocessedIngredient, createUnprocessedIngredient, updateUnprocessedIngredient } = require("../controllers/unprocessedingredient.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const unprocessedIngredientRouter = express.Router();

unprocessedIngredientRouter.get("/", getAllUnprocessedIngredient);
unprocessedIngredientRouter.post("/create", authenticate, authorize(["Admin"]), createUnprocessedIngredient);
unprocessedIngredientRouter.put("/update/:id_u_ingredient", authenticate, authorize(["Admin"]), updateUnprocessedIngredient);

module.exports = {
    unprocessedIngredientRouter,
}