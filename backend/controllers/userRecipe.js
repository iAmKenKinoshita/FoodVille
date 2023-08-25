const userRecipeModel = require("../model/userRecipe");

exports.getMyRecipeList = async (req, res) => {
	try {
		const userID = req.params.userId;
		const recipe = await userRecipeModel.getAllRecipeList(userID);
		res.status(200).send(recipe);
	} catch (error) {
		console.log(error);
	}
};

exports.getAllIngredients = async (req, res) => {
	try {
		const ID = req.params.listId;
		const ingredients = await userRecipeModel.getAllIngredients(ID);
		res.status(200).send(ingredients);
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
		const is_favorite = req.get("is_favorite");

		let recipeId = await userRecipeModel.createNewRecipe(
			userID,
			name,
			description,
			instruction,
			is_fv,
			is_favorite
		);

		await userRecipeModel.editRecipeIngredients(ingredients, recipeId[0].id);

		res.status(200).send({ message: "Created new recipe" });
	} catch (error) {
		console.log(error);
	}
};

exports.editRecipe = async (req, res) => {
	try {
		const ID = req.params.listId;
		const { recipeName, description, instructions, ingredients } = req.body;
		const recipeDetails = { recipeName, description, instructions };

		await userRecipeModel.editRecipeDetails(recipeDetails, ID);
		await userRecipeModel.deleteIngredients(ID);
		await userRecipeModel.editRecipeIngredients(ingredients, ID);
		res.status(200).send({ message: "Edit successful" });
	} catch (error) {
		console.log(error);
	}
};

exports.deleteRecipe = async (req, res) => {
	try {
		const ID = req.params.listId;
		await userRecipeModel.deleteIngredients(ID);
		await userRecipeModel.deleteRecipe(ID);
		res.status(200).send({ message: "Deleted recipe" });
	} catch (error) {
		console.log(error);
	}
};

exports.addToFavorites = async (req, res) => {
	try {
		const recipeId = req.params.recipeId;
		const is_favorite = req.get("is_favorite");
		await userRecipeModel.addToFavorites(recipeId, is_favorite);
		res.status(200).send({ message: "Added/Removed Favorites" });
	} catch (error) {
		console.log(error);
	}
};
