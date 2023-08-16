import { Popover } from "react-bootstrap";

import dummydata from "./dummydata";

const homepageUtils = {
	searchRecipe: async (setSearchRecipes, keywords) => {
		try {
			// let recipes = await fetch("/home", {
			// 	method: "POST",
			// 	headers: {
			// 		query: keywords,
			// 	},
			// });

			// recipes = await recipes.json();

			// recipes.results = await recipes.results.filter((recipe) => {
			// 	if (Object.keys(recipe).length >= 50) {
			// 		return recipe;
			// 	}
			// });

			// return setSearchRecipes(recipes);
			return setSearchRecipes(dummydata);
		} catch (error) {
			console.log(error);
		}
	},
	searchRecipeByCategory: async (setSearchRecipes, tag, from) => {
		try {
			let recipes = await fetch("/home", {
				method: "POST",
				headers: {
					tag,
					from,
				},
			});
			recipes = await recipes.json();
			// recipes.results = await recipes.results.filter((recipe) => {
			// 	if (Object.keys(recipe).length >= 50) {
			// 		return recipe;
			// 	}
			// });
			return setSearchRecipes(recipes);
		} catch (error) {
			console.error(error);
		}
	},
	saveApiRecipe: async (userId, selectedRecipe) => {
		try {
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
	getFeaturedRecipes: async (setFeaturedRecipes) => {
		try {
			// let recipes = await fetch("/home", {
			// 	method: "GET",
			// });

			// recipes = await recipes.json();
			// recipes = await recipes.filter((recipe) => {
			// 	if (Object.keys(recipe).length >= 50) {
			// 		return recipe;
			// 	}
			// });
			// return setFeaturedRecipes(recipes);
			return setFeaturedRecipes(dummydata.results);
		} catch (error) {
			console.log(error);
		}
	},
};

export default homepageUtils;
