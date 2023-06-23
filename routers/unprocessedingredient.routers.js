const express = require("express");
const {Unprocessed_ingredient} = require("../models")
const { getAllUnprocessedIngredient, createUnprocessedIngredient, updateUnprocessedIngredient, getDetailUnprocessedIngredient } = require("../controllers/unprocessedingredient.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateUnprocessedIngredient } = require("../middlewares/validates/checkCreate.js");
const unprocessedIngredientRouter = express.Router();

unprocessedIngredientRouter.get("/", getAllUnprocessedIngredient);
unprocessedIngredientRouter.get("/page/:page", getAllUnprocessedIngredient);
unprocessedIngredientRouter.get("/detail/:id_u_ingredient", authenticate, authorize(["Admin"]), getDetailUnprocessedIngredient);
unprocessedIngredientRouter.post("/create", authenticate, authorize(["Admin"]), checkCreateUnprocessedIngredient(Unprocessed_ingredient), createUnprocessedIngredient);
unprocessedIngredientRouter.put("/update/:id_u_ingredient", authenticate, authorize(["Admin"]), updateUnprocessedIngredient);

module.exports = {
    unprocessedIngredientRouter,
}