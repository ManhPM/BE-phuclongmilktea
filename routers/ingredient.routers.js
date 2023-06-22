const express = require("express");
const {Ingredient} = require("../models")
const { getAllIngredient, processingIngredient, createIngredient, updateIngredient, getDetailIngredient } = require("../controllers/ingredient.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const { checkCreateIngredient } = require("../middlewares/validates/checkCreate");
const ingredientRouter = express.Router();

ingredientRouter.get("/", getAllIngredient);
ingredientRouter.get("/detail/:id_ingredient", authenticate, authorize(["Admin"]), getDetailIngredient);
ingredientRouter.post("/process/:id_ingredient", authenticate, authorize(["Nhân viên"]), processingIngredient);
ingredientRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateIngredient(Ingredient), createIngredient);
ingredientRouter.put("/update/:id_ingredient", authenticate, authorize(["Admin"]), updateIngredient);

module.exports = {
    ingredientRouter,
}