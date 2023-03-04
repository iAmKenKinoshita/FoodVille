const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");

//Get requests
router.get("/", homepageController.getRecipes);

//Not needed?
// router.get("/getRecipeDetails/:id", homepageController.getRecipeDetails);

//Post requests
router.post("/saveApiRecipe/:id", homepageController.saveApiRecipe);

module.exports = router;