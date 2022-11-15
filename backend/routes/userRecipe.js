const express = require("express");
const router = express.Router();
const userRecipeController = require("../controllers/userRecipe");

//Get Routes
router.get("/list", userRecipeController.getMyRecipeList);
router.get("/list/:listId", userRecipeController.getAllIngredients);

//Post Routes
router.post("/createNewRecipe", userRecipeController.createNewRecipe);
router.post("/addIngredients/:listId", userRecipeController.addIngredient);

//Patch Routes
router.patch("/editRecipe/:listId", userRecipeController.editRecipe);

//Delete Routes
router.delete("/deleteRecipe/:listId", userRecipeController.deleteRecipe);

module.exports = router;
