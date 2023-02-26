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
		let instructions = [];

		selectedRecipe.instructions.map((instruction) => {
			// console.log(instruction);
			instructions.push(instruction.display_text);
		});

		instructions = instructions.join(" ");
		console.log(instructions);

		const name = selectedRecipe.name;
		const description = selectedRecipe.description;
		// const instructions = selectedRecipe.instructions;
		const ingredients = selectedRecipe.sections;
		console.log(name, description, instructions, ingredients);
		try {
			await fetch(`/home/saveApiRecipe/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(selectedRecipe),
				// headers: {
				// 	name: name,
				// 	description: description,
				// 	instructions: instructions,
				// 	ingredients: ingredients,
				// 	is_fv: true,
				// },
			});
		} catch (error) {
			console.log(error);
		}
	},
};

export default homepageUtils;
