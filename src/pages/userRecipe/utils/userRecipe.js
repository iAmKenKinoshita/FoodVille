import { Popover } from "react-bootstrap";

//Later
import API_URL, { REACT_APP_URL } from "../../../Constants";
import axios from "axios";

const userRecipeUtils = {
	//Recipes API
	getRecipes: async (
		userId,
		setSelectedRecipes,
		setAllRecipes,
		setAllFavoriteRecipes,
		setFoodVilleRecipes,
		setFoodVilleFavoriteRecipes,
		setUserRecipes,
		setUserFavoriteRecipes
	) => {
		let allRecipes = await fetch(`userRecipe/recipes/${userId}`);
		allRecipes = await allRecipes.json();

		setSelectedRecipes(allRecipes);

		//All Recipes
		setAllRecipes(allRecipes);
		let AllFavoriteRecipes = allRecipes.filter((recipe) => recipe.is_favorite);
		setAllFavoriteRecipes(AllFavoriteRecipes);

		//Foodville Recipes
		let foodVilleRecipes = allRecipes.filter((recipe) => recipe.is_fv);
		setFoodVilleRecipes(foodVilleRecipes);
		let foodVilleFavoriteRecipes = allRecipes.filter(
			(recipe) => recipe.is_fv && recipe.is_favorite
		);
		setFoodVilleFavoriteRecipes(foodVilleFavoriteRecipes);

		//User Recipes
		let userRecipes = allRecipes.filter((recipe) => !recipe.is_fv);
		setUserRecipes(userRecipes);
		let userFavoriteRecipes = allRecipes.filter(
			(recipe) => !recipe.is_fv && recipe.is_favorite
		);
		setUserFavoriteRecipes(userFavoriteRecipes);
	},
	deleteRecipe: async (id) => {
		try {
			await fetch(`userRecipe/deleteRecipe/${id}`, {
				method: "DELETE",
			});
		} catch (error) {
			console.log(error);
		}
	},
	addNewRecipe: async (userId, data) => {
		try {
			await fetch(`userRecipe/createNewRecipe/${userId}`, {
				method: "POST",
				headers: {
					name: data.recipeName,
					description: data.description,
					instruction: data.instructions,
					ingredients: JSON.stringify(data.ingredients),
					is_fv: false,
					is_favorite: false,
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
	saveRecipeChanges: async (id, recipeDetails) => {
		try {
			await fetch(`userRecipe/editRecipe/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(recipeDetails),
			});
		} catch (error) {
			console.log(error);
		}
	},
	addOrRemoveFavorite: async (recipeId, is_favorite) => {
		try {
			await fetch(`userRecipe/addToFavorites/${recipeId}`, {
				method: "PATCH",
				headers: {
					is_favorite: !is_favorite,
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
	handleFavorite: (
		recipe,
		currentRecipes,
		setSelectedRecipes,
		allRecipes,
		setAllFavoriteRecipes,
		setFoodVilleRecipes,
		setFoodVilleFavoriteRecipes,
		setUserRecipes,
		setUserFavoriteRecipes
	) => {
		recipe.is_favorite = !recipe.is_favorite;
		let AllFavoriteRecipes = allRecipes.filter((recipe) => recipe.is_favorite);
		setAllFavoriteRecipes(AllFavoriteRecipes);

		//Foodville Recipes
		let foodVilleRecipes = allRecipes.filter((recipe) => recipe.is_fv);
		setFoodVilleRecipes(foodVilleRecipes);
		let foodVilleFavoriteRecipes = allRecipes.filter(
			(recipe) => recipe.is_fv && recipe.is_favorite
		);
		setFoodVilleFavoriteRecipes(foodVilleFavoriteRecipes);

		//User Recipes
		let userRecipes = allRecipes.filter((recipe) => !recipe.is_fv);
		setUserRecipes(userRecipes);
		let userFavoriteRecipes = allRecipes.filter(
			(recipe) => !recipe.is_fv && recipe.is_favorite
		);
		setUserFavoriteRecipes(userFavoriteRecipes);

		if (currentRecipes === "allFavorites") {
			setSelectedRecipes(AllFavoriteRecipes);
		}
		if (currentRecipes === "foodVilleFavorites") {
			setSelectedRecipes(foodVilleFavoriteRecipes);
		}

		if (currentRecipes === "userFavorites") {
			setSelectedRecipes(userFavoriteRecipes);
		}

		//Old Codes
		// if (currentRecipes === "allFavorites" && !recipe.is_favorite) {
		// 	setSelectedRecipes(AllFavoriteRecipes);
		// }
		// if (currentRecipes === "foodVilleFavorites" && !recipe.is_favorite) {
		// 	console.log("here");
		// 	setSelectedRecipes(foodVilleFavoriteRecipes);
		// }

		// if (currentRecipes === "userFavorites" && !recipe.is_favorite) {
		// 	setSelectedRecipes(userFavoriteRecipes);
		// }
	},
	handleDelete: (
		recipeId,
		currentRecipes,
		setSelectedRecipes,
		allRecipes,
		setAllRecipes,
		setAllFavoriteRecipes,
		setFoodVilleRecipes,
		setFoodVilleFavoriteRecipes,
		setUserRecipes,
		setUserFavoriteRecipes
	) => {
		allRecipes = allRecipes.filter((recipe) => recipe.id !== recipeId);
		setAllRecipes(allRecipes);

		let AllFavoriteRecipes = allRecipes.filter((recipe) => recipe.is_favorite);
		setAllFavoriteRecipes(AllFavoriteRecipes);

		//Foodville Recipes
		let foodVilleRecipes = allRecipes.filter((recipe) => recipe.is_fv);
		setFoodVilleRecipes(foodVilleRecipes);
		let foodVilleFavoriteRecipes = allRecipes.filter(
			(recipe) => recipe.is_fv && recipe.is_favorite
		);
		setFoodVilleFavoriteRecipes(foodVilleFavoriteRecipes);

		//User Recipes
		let userRecipes = allRecipes.filter((recipe) => !recipe.is_fv);
		setUserRecipes(userRecipes);
		let userFavoriteRecipes = allRecipes.filter(
			(recipe) => !recipe.is_fv && recipe.is_favorite
		);
		setUserFavoriteRecipes(userFavoriteRecipes);

		if (currentRecipes === "allRecipes") {
			setSelectedRecipes(allRecipes);
		}
		if (currentRecipes === "allFavorites") {
			setSelectedRecipes(AllFavoriteRecipes);
		}
		if (currentRecipes === "foodVilleRecipes") {
			setSelectedRecipes(foodVilleRecipes);
		}
		if (currentRecipes === "foodVilleFavorites") {
			setSelectedRecipes(foodVilleFavoriteRecipes);
		}
		if (currentRecipes === "userRecipes") {
			setSelectedRecipes(userRecipes);
		}
		if (currentRecipes === "userFavorites") {
			setSelectedRecipes(userFavoriteRecipes);
		}
	},

	toggleSideBarIsActive: (e) => {
		document.querySelector(".is-active").classList.remove("is-active");
		e.target.classList.add("is-active");
	},

	deletePopover: (
		ID,
		currentRecipes,
		setSelectedRecipes,
		allRecipes,
		setAllRecipes,
		setAllFavoriteRecipes,
		setFoodVilleRecipes,
		setFoodVilleFavoriteRecipes,
		setUserRecipes,
		setUserFavoriteRecipes
	) => {
		return (
			<Popover id="popover-basic">
				<Popover.Header as="h2">Delete confirmation</Popover.Header>

				<div className="card">
					<div className="card-content popover-content">
						<div className="content">
							Are you sure you want to <strong>delete</strong> this recipe?
						</div>
					</div>
					<div className="card-footer delete-pop">
						<a
							type="button"
							className="card-footer-item popover-button"
							onClick={() => {
								userRecipeUtils.deleteRecipe(ID);
								userRecipeUtils.handleDelete(
									ID,
									currentRecipes,
									setSelectedRecipes,
									allRecipes,
									setAllRecipes,
									setAllFavoriteRecipes,
									setFoodVilleRecipes,
									setFoodVilleFavoriteRecipes,
									setUserRecipes,
									setUserFavoriteRecipes
								);
							}}
						>
							Yes
						</a>{" "}
						<a className="card-footer-item popover-button">No</a>{" "}
					</div>
				</div>
			</Popover>
		);
	},

	onIngredientChange: ({ name, value }, index, ingredients, setIngredients) => {
		const clonedIngredients = [...ingredients];
		clonedIngredients.splice(index, 1, {
			...ingredients[index],
			[name]: value,
		});
		setIngredients(clonedIngredients);
	},
	onRecipeDetailChange: ({ name, value }, recipeDetails, setRecipeDetails) => {
		const clonedSelectedRecipe = { ...recipeDetails };
		clonedSelectedRecipe[name] = value;
		setRecipeDetails(clonedSelectedRecipe);
	},
	addIngredient: (ingredients, setIngredients) => {
		const clonedIngredients = [...ingredients];
		//Old Code
		// const ingredientData = { ingredient_name: "", amount: "" };
		const ingredientData = { ingredient_info: "" };
		clonedIngredients.push(ingredientData);
		setIngredients(clonedIngredients);
	},
	deleteIngredient: (index, ingredients, setIngredients) => {
		const clonedIngredients = [...ingredients];
		clonedIngredients.splice(index, 1);
		setIngredients(clonedIngredients);
	},
};

export default userRecipeUtils;
