const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "4a0f4158b8msh4c2e002dd23f7b9p15ff75jsn13b73e5788bb",
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
	},
};

exports.getRecipes = (req, res) => {
	fetch(
		"https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes",
		options
	)
		.then((response) => response.json())
		.then((response) => res.send(response.results))
		.catch((err) => console.error(err));
};

exports.getRecipeDetails = (req, res) => {
	const ID = req.params.id;
	fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${ID}`, options)
		.then((response) => response.json())
		.then((response) => res.send(response))
		.catch((err) => console.error(err));
};
