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
	saveApiRecipe: async (userId, selectedRecipe) => {
		try {
			console.log(selectedRecipe)
			await fetch(`/home/saveApiRecipe/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(selectedRecipe),
			});
		} catch (error) {
			console.log(error);
		}
	},
};

export default homepageUtils;
