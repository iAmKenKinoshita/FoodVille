const { response } = require("express");

const userRecipeModel = require("../model/userRecipe");

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": process.env.TASTY_API,
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
	},
};

const homepageController = {
	getRecipes: async (req, res) => {
		const query = req.get("query");

		try {
			let data = await fetch(
				`https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&q=${query}`,
				options
			);
			data = await data.json();
			res.send(data.results);
		} catch (error) {
			console.log(error);
		}
	},
	saveApiRecipe: async (req, res) => {
		try {
			const data = req.body;
			const userId = req.params.id;
			let recipeID = await userRecipeModel.saveApiRecipe(userId, data);
			await userRecipeModel.saveApiRecipeIngredients(recipeID[0].id, data);
			console.log("it is here", userId, recipeID);
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = homepageController;
