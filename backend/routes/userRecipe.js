const express = require("express");
const router = express.Router();
const userRecipeController = require("../controllers/userRecipe");

//Get Routes
router.get("/recipes/:userId", userRecipeController.getMyRecipeList);
router.get("/ingredients/:listId", userRecipeController.getAllIngredients);

//Post Routes
router.post("/createNewRecipe/:userId", userRecipeController.createNewRecipe);

//Patch Routes
router.patch("/editRecipe/:listId", userRecipeController.editRecipe);

//Delete Routes
router.delete("/deleteRecipe/:listId", userRecipeController.deleteRecipe);

module.exports = router;
