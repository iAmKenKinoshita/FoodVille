import { Popover } from "react-bootstrap";

import dummydata from "./dummyfeatured";

import dummytag from "./dummytags";

const homepageUtils = {
	searchRecipe: async (setSearchRecipes, keywords) => {
		try {
			let recipes = await fetch("/home", {
				method: "POST",
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
			return setSearchRecipes(recipes);
		} catch (error) {
			console.log(error);
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
			// recipes = await recipes.results.filter((recipe) => {
			// 	if (Object.keys(recipe).length === 2) {
			// 		return recipe;
			// 	}
			// });
			// recipes = await recipes.filter((recipe) => {
			// 	if (Object.keys(recipe.item).length >= 50) {
			// 		return recipe;
			// 	}
			// });
			// return setFeaturedRecipes(recipes);
			const rootTagType = {};
			// const cuisine;

			for (let i = 0; i < dummytag.results.length; i++) {
				// console.log(dummytag.results[i]);
				if (!rootTagType[dummytag.results[i].root_tag_type]) {
					rootTagType[dummytag.results[i].root_tag_type] = 0;
				}
				rootTagType[dummytag.results[i].root_tag_type]++;
			}
			console.log("RootTagType", rootTagType);

			return setFeaturedRecipes(dummydata);
		} catch (error) {
			console.log(error);
		}
	},
};

export default homepageUtils;
