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
		const tag = req.get("tag");
		let from = req.get("from");

		let response;

		try {
			if (query) {
				response = await fetch(
					`https://tasty.p.rapidapi.com/recipes/list?from=${
						from ? from : 0
					}&from=40&q=${query}`,
					options
				);
				response = await response.json();
				res.send(response);
			}
			if (tag) {
				response = await fetch(
					`https://tasty.p.rapidapi.com/recipes/list?from=${
						from ? from : 0
					}&size=40&tags=${tag}`,
					options
				);
				response = await response.json();
				res.send(response);
			}
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
			res.status(201).send({
				message: "Recipe saved!",
			});
		} catch (error) {
			console.log(error);
		}
	},
	getFeaturedRecipes: async (req, res) => {
		try {
			let response = await fetch(
				"https://tasty.p.rapidapi.com/recipes/list?from=0&size=39&tags=under_30_minutes",
				options
			);
			response = await response.json();
			res.send(response.results);
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = homepageController;
