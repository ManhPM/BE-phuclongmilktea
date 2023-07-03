const express = require("express");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const { checkCreateRecipeItem, checkCreateRecipeIngredient } = require("../middlewares/validates/checkCreate");
const { getDetailRecipeItem, getDetailRecipeIngredient, createRecipeItem, getAllRecipeItem, getAllRecipeIngredient, createRecipeIngredient, updateRecipeItem, updateRecipeIngredient, deleteRecipeItem, deleteRecipeIngredient } = require("../controllers/recipe.controllers");
const recipeRouter = express.Router();

recipeRouter.get("/item/:id_item", authenticate, authorize(["Admin"]), getAllRecipeItem);
recipeRouter.get("/ingredient/:id_ingredient", authenticate, authorize(["Admin"]), getAllRecipeIngredient);
recipeRouter.get("/item/detail/:id_item/:id_ingredient", authenticate, authorize(["Admin"]), getDetailRecipeItem);
recipeRouter.get("/ingredient/detail/:id_ingredient/:id_u_ingredient", authenticate, authorize(["Admin"]), getDetailRecipeIngredient);
recipeRouter.post("/item/create", authenticate, authorize(["Admin"]), checkCreateRecipeItem, createRecipeItem);
recipeRouter.post("/ingredient/create", authenticate, authorize(["Admin"]), checkCreateRecipeIngredient, createRecipeIngredient);
recipeRouter.put("/item/update/:id_item/:id_ingredient", authenticate, authorize(["Admin"]), updateRecipeItem);
recipeRouter.put("/ingredient/update/:id_ingredient/:id_u_ingredient", authenticate, authorize(["Admin"]), updateRecipeIngredient);
recipeRouter.delete("/item/delete/:id_item/:id_ingredient", authenticate, authorize(["Admin"]), deleteRecipeItem);
recipeRouter.delete("/ingredient/delete/:id_ingredient/:id_u_ingredient", authenticate, authorize(["Admin"]), deleteRecipeIngredient);

module.exports = {
    recipeRouter,
}