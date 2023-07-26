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
			// recipes = await recipes.filter((recipe) => {
			// 	if (Object.keys(recipe).length >= 50) {
			// 		return recipe;
			// 	}
			// });
			// return setSearchRecipes(recipes);
			console.log(dummydata);
			return setSearchRecipes(dummydata);
		} catch (error) {
			console.log(error);
		}
	},
	searchRecipeByCategory: async (setSearchRecipes, tag) => {
		try {
			let recipes = await fetch("/home", {
				method: "POST",
				headers: {
					tag,
				},
			});

			recipes = await recipes.json();
			recipes = await recipes.filter((recipe) => {
				if (Object.keys(recipe).length >= 50) {
					return recipe;
				}
			});
			// console.log(recipes);
			return setSearchRecipes(recipes);
		} catch (error) {}
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
	logInPopover: (navigate) => {
		return (
			<Popover id="popover-basic">
				<Popover.Header as="h3">Wanna save this recipe?</Popover.Header>
				<Popover.Body>
					Click{" "}
					<a href="javascript:void(0);" onClick={() => navigate("/signIn")}>
						<strong>here</strong>
					</a>{" "}
					to sign-in and save this recipe!
				</Popover.Body>
			</Popover>
		);
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
			console.log(dummydata);
			return setFeaturedRecipes(dummydata);
		} catch (error) {
			console.log(error);
		}
	},
};

export default homepageUtils;
