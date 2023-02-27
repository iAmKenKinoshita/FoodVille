const { response } = require("express");

const userRecipeModel = require("../model/userRecipe");

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "4a0f4158b8msh4c2e002dd23f7b9p15ff75jsn13b73e5788bb",
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
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = homepageController;
