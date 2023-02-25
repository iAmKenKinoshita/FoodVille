const { response } = require("express");

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "4a0f4158b8msh4c2e002dd23f7b9p15ff75jsn13b73e5788bb",
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
	},
};

exports.getRecipes = async (req, res) => {
	console.log(req.get("query"));
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

	// Old Code
	// fetch(
	// 	`https://tasty.p.rapidapi.com/recipes/list?from=0&size=40&q=${query}`,
	// 	options
	// )
	// 	.then((response) => response.json())
	// 	.then((response) => res.send(response.results))
	// 	.catch((err) => console.error(err));
};

exports.getRecipeDetails = (req, res) => {
	const ID = req.params.id;
	fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${ID}`, options)
		.then((response) => response.json())
		.then((response) => res.send(response))
		.catch((err) => console.error(err));
};
