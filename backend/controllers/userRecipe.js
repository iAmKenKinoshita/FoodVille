const userRecipeModel = require("../model/userRecipe");

exports.getMyRecipeList = async (req, res) => {
	try {
		const userID = req.params.userId;
		const recipe = await userRecipeModel.getAllRecipeList(userID);
		res.send(recipe);
	} catch (error) {
		console.log(error);
	}
};

exports.getAllIngredients = async (req, res) => {
	try {
		const ID = req.params.listId;
		const ingredients = await userRecipeModel.getAllIngredients(ID);
		res.send(ingredients);
	} catch (error) {
		console.log(error);
	}
};

exports.createNewRecipe = async (req, res) => {
	try {
		const userID = req.params.userId;
		const name = req.get("name");
		const description = req.get("description");
		const instruction = req.get("instruction");
		const ingredients = JSON.parse(req.get("ingredients"));
		const is_fv = req.get("is_fv");

		await userRecipeModel.createNewRecipe(
			userID,
			name,
			description,
			instruction,
			is_fv
		);

		let allRecipes = [];

		await userRecipeModel.getAllRecipeList(userID).then((data) => {
			allRecipes = data;
		});

		let recipe = allRecipes.find((recipe) => recipe.name === name);
		let RecipeId = recipe.id;

		await userRecipeModel.editRecipeIngredients(ingredients, RecipeId);

		res.status(200).send("Created new recipe");
	} catch (error) {
		console.log(error);
	}
};

exports.editRecipe = async (req, res) => {
	try {
		const ID = req.params.listId;
		const ingredients = JSON.parse(req.get("ingredients"));
		const recipeDetails = JSON.parse(req.get("recipeDetails"));

		await userRecipeModel.editRecipeDetails(recipeDetails, ID);
		await userRecipeModel.deleteIngredients(ID);
		await userRecipeModel.editRecipeIngredients(ingredients, ID);
		res.send("Recipe Edited");
	} catch (error) {
		console.log(error);
	}
};

exports.deleteRecipe = async (req, res) => {
	try {
		const ID = req.params.listId;
		await userRecipeModel.deleteIngredients(ID);
		await userRecipeModel.deleteRecipe(ID);
		res.send("Deleted recipe");
	} catch (error) {
		console.log(error);
	}
};
