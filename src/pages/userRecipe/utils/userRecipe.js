import { Popover } from "react-bootstrap";

//Later
import API_URL, { REACT_APP_URL } from "../../../Constants";
import axios from "axios";

const userRecipeUtils = {
	getRecipes: async (
		userId,
		setSelectedRecipes,
		setAllRecipes,
		setFoodVilleRecipes,
		setUserRecipes
	) => {
		let allRecipes = await fetch(`userRecipe/recipes/${userId}`);
		allRecipes = await allRecipes.json();
		setSelectedRecipes(allRecipes);
		setAllRecipes(allRecipes);
		let foodVilleRecipes = allRecipes.filter((recipe) => recipe.is_fv === true);
		setFoodVilleRecipes(foodVilleRecipes);
		let userRecipes = allRecipes.filter((recipe) => recipe.is_fv === false);
		setUserRecipes(userRecipes);

		// fetch(`userRecipe/recipes/1`)
		// 	.then((result) => result.json())
		// 	.then((data) => setRecipes(data));
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
	deleteRecipe: async (id) => {
		try {
			// await axios.delete(`${API_URL}/userRecipe/deleteRecipe/${id}`);
			// console.log("deleted");
			await fetch(`userRecipe/deleteRecipe/${id}`, {
				method: "DELETE",
			});
		} catch (error) {
			console.log(error);
		}
	},
	addNewRecipe: async (
		e,
		userId,
		{ name, description, instruction, ingredients }
	) => {
		try {
			e.preventDefault();
			await fetch(`userRecipe/createNewRecipe/${userId}`, {
				method: "POST",
				headers: {
					name: name,
					description: description,
					instruction: instruction,
					ingredients: JSON.stringify(ingredients),
					is_fv: false,
				},
			});
		} catch (error) {
			console.log(error);
		}
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
};

export default userRecipeUtils;
