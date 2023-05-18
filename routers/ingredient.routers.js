const express = require("express");
const { getAllIngredient, processingIngredient, createIngredient, updateIngredient } = require("../controllers/ingredient.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const ingredientRouter = express.Router();

ingredientRouter.get("/", getAllIngredient);
ingredientRouter.post("/process/:id_ingredient", authenticate, authorize(["Nhân viên"]), processingIngredient);
ingredientRouter.post("/create", authenticate, authorize(["Admin"]), createIngredient);
ingredientRouter.put("/update/:id_ingredient", authenticate, authorize(["Admin"]), updateIngredient);

module.exports = {
    ingredientRouter,
}