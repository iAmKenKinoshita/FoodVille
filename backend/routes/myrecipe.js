const express = require("express");
const router = express.Router();
const myRecipeController = require("../controllers/myrecipe");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));


//Get Routes
router.get("/list", myRecipeController.getMyRecipeList);
router.get("/list/:listId", myRecipeController.getAllIngredients)

//Post Routes

//Patch Routes

module.exports = router;
