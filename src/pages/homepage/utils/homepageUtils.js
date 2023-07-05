import { Popover } from "react-bootstrap";

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

	getFeaturedRecipe: async (setSearchRecipes) => {
		try {
			console.log("This is from the frontend");
			let recipes = await fetch("/home", {
				method: "GET",
			});

			recipes = await recipes.json();
			console.log("This is from the frontend2", recipes.results);
			recipes = await recipes.results.filter((recipe) => {
				if (Object.keys(recipe).length === 2) {
					return recipe;
				}
			});
			console.log("These are the recipes", recipes);

			recipes = await recipes.filter((recipe) => {
				if (Object.keys(recipe.item).length >= 50) {
					return recipe;
				}
			});
			console.log("These are the FINAL recipes", recipes);
			return setSearchRecipes(recipes);
		} catch (error) {
			console.log(error);
		}
	},
};

export default homepageUtils;
