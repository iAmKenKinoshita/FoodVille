const userRecipeModel = require("../model/userRecipe");

exports.getMyRecipeList = async (req, res, next) => {
	// console.log(req.params.userId);
	// const recipe = await userRecipeModel.getAllRecipeList();
	// res.send(recipe);

	const userID = req.params.userId;
	const recipe = await userRecipeModel.getAllRecipeList(userID);
	res.send(recipe);
};

exports.getAllIngredients = async (req, res, next) => {
	const ID = req.params.listId;
	const ingredients = await userRecipeModel.getAllIngredients(ID);

	res.send(ingredients);
};

exports.createNewRecipe = async (req, res, next) => {
	console.log(req.params.userId);
	const userID = req.params.userId;
	const name = req.get("name");
	const description = req.get("description");
	const instruction = req.get("instruction");
	console.log(name, description, instruction);

	await userRecipeModel.createNewRecipe(userID, name, description, instruction);
};

exports.addIngredient = async (req, res, next) => {
	const ID = req.params.listId;
	const name = req.get("ingredientName");
	const amount = req.get("amount");

	await userRecipeModel.addIngredients(name, amount, ID);
};

exports.editRecipe = async (req, res, next) => {
	const ID = req.params.listId;
	const ingredients = JSON.parse(req.get("ingredients"));
	const recipeDetails = JSON.parse(req.get("recipeDetails"));
	await userRecipeModel.editRecipeDetails(recipeDetails, ID);
	await userRecipeModel.deleteIngredients(ID);
	await userRecipeModel.editRecipeIngredients(ingredients, ID);
};

exports.deleteRecipe = async (req, res, next) => {
	const ID = req.params.listId;
	await userRecipeModel.deleteIngredients(ID);
	await userRecipeModel.deleteRecipe(ID);
};
