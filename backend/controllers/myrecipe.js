const myRecipeModel = require("../model/myrecipe");

exports.getMyRecipeList = async (req, res, next) => {
	let recipe = await myRecipeModel.getAllRecipeList();
	res.send(recipe);
};

exports.getAllIngredients = async (req, res, next) => {
	let ID = req.params.listId;
	let ingredients = await myRecipeModel.getAllIngredients(ID)

	res.send(ingredients)
}