const homepageUtils = {
	searchRecipe: async (setSearchRecipes, keywords) => {
		try {
			let recipes = await fetch("/home", {
				method: "GET",
				headers: {
					query: keywords,
				},
			});

			recipes = await recipes.json();
			recipes = await recipes.filter((recipe) => {
				if (Object.keys(recipe).length >= 50) {
					return recipe;
				}
			});
			console.log(recipes);

			return setSearchRecipes(recipes);
		} catch (error) {
			console.log(error);
		}

		console.log(keywords);
		//Old Code
		// fetch(""/home, {
		// 	method: "GET",
		// 	headers: {
		// 		query: keywords,
		// 	},
		// })
		// 	.then((result) => result.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 		setSearchRecipes(data);
		// 	});
	},
};

export default homepageUtils;
