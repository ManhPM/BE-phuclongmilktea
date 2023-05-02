const express = require("express");
const { getAllIngredient, processingIngredient } = require("../controllers/ingredient.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const ingredientRouter = express.Router();

ingredientRouter.get("/", getAllIngredient);
ingredientRouter.post("/:id_ingredient", authenticate, authorize(["Nhân viên"]), processingIngredient);

module.exports = {
    ingredientRouter,
}