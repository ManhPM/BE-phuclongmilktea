const express = require("express");
const { getAllUnprocessedIngredient } = require("../controllers/unprocessedingredient.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const unprocessedIngredientRouter = express.Router();

unprocessedIngredientRouter.get("/", getAllUnprocessedIngredient);

module.exports = {
    unprocessedIngredientRouter,
}