const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");

//Home
router.post("/", homepageController.getRecipes);
router.get("/", homepageController.getFeaturedRecipes);

//Feature Recipe

//Not needed?
// router.get("/getRecipeDetails/:id", homepageController.getRecipeDetails);

//Post requests
router.post("/saveApiRecipe/:id", homepageController.saveApiRecipe);

module.exports = router;
