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
		const data = req.body;
		const userId = req.params.id;

		//Saved?
		// console.log("This is save");
		// const name = req.get("name");
		// const description = req.get("description");
		// const instructions = req.get("hello");
		// const ingredients = req.get("ingredients");
		// const is_fv = req.get("is_fv");
		// console.log(name, description, instructions, ingredients, is_fv);
		let recipeID = await userRecipeModel.saveApiRecipe(userId, req.body);
		console.log(recipeID);
		// userRecipeModel.saveApiRecipeIngredients()
		try {
		} catch (error) {}
	},
};

module.exports = homepageController;

// exports.getRecipes = async (req, res) => {
// 	console.log(req.get("query"));
// 	const query = req.get("query");

// 	try {
// 		let data = await fetch(
// 			`https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&q=${query}`,
// 			options
// 		);
// 		data = await data.json();
// 		res.send(data.results);
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	// Old Code
// 	// fetch(
// 	// 	`https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&q=${query}`,
// 	// 	options
// 	// )
// 	// 	.then((response) => response.json())
// 	// 	.then((response) => res.send(response.results))
// 	// 	.catch((err) => console.error(err));
// };

//Not Needed?
// exports.getRecipeDetails = (req, res) => {
// 	const ID = req.params.id;
// 	fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${ID}`, options)
// 		.then((response) => response.json())
// 		.then((response) => res.send(response))
// 		.catch((err) => console.error(err));
// };
