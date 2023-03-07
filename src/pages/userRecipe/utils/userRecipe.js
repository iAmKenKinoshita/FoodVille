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
	addNewRecipe: async (
		userId,
		{ name, description, instruction, ingredients }
	) => {
		try {
			await fetch(`userRecipe/createNewRecipe/${userId}`, {
				method: "POST",
				headers: {
					name: name,
					description: description,
					instruction: instruction,
					ingredients: JSON.stringify(ingredients),
					is_fv: false,
					is_favorite: false,
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
	saveRecipeChanges: async (id, ingredients, recipeDetails) => {
		try {
			await fetch(`userRecipe/editRecipe/${id}`, {
				method: "PATCH",
				headers: {
					ingredients: JSON.stringify(ingredients),
					recipeDetails: JSON.stringify(recipeDetails),
				},
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
		selectedRecipes,
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
		console.log(AllFavoriteRecipes);
		setAllFavoriteRecipes(AllFavoriteRecipes);

		//Foodville Recipes
		let foodVilleRecipes = allRecipes.filter((recipe) => recipe.is_fv);
		setFoodVilleRecipes(foodVilleRecipes);
		let foodVilleFavoriteRecipes = allRecipes.filter(
			(recipe) => recipe.is_fv && recipe.is_favorite
		);
		setFoodVilleFavoriteRecipes(foodVilleFavoriteRecipes);
		console.log(foodVilleFavoriteRecipes);

		//User Recipes
		let userRecipes = allRecipes.filter((recipe) => !recipe.is_fv);
		setUserRecipes(userRecipes);
		let userFavoriteRecipes = allRecipes.filter(
			(recipe) => !recipe.is_fv && recipe.is_favorite
		);
		setUserFavoriteRecipes(userFavoriteRecipes);
		console.log(userFavoriteRecipes);

		if (recipe.is_fv && !recipe.is_favorite) {
			setSelectedRecipes(foodVilleFavoriteRecipes);
		}

		if (!recipe.is_fv && !recipe.is_favorite) {
			setSelectedRecipes(userFavoriteRecipes);
		}
	},

	deletePopover: (ID) => {
		return (
			<Popover id="popover-basic">
				<Popover.Header as="h3">Delete confirmation</Popover.Header>
				<Popover.Body>
					Are you sure you want to <strong>delete</strong> this recipe?
					<div className="box">
						<div className="columns is-1">
							<button
								className="button is-danger column"
								onClick={() => {
									userRecipeUtils.deleteRecipe(ID);
								}}
							>
								Yes
							</button>{" "}
							<button className="button column">No</button>{" "}
						</div>
					</div>
				</Popover.Body>
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
		// console.log(name, value, recipeDetails, setRecipeDetails);
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
