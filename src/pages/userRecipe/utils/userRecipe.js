import { Popover } from "react-bootstrap";

//Later
import API_URL, { REACT_APP_URL } from "../../../Constants";
import axios from "axios";

const userRecipeUtils = {
	deletePopover: (ID) => {
		return (
			<Popover id="popover-basic">
				<Popover.Header as="h3">Delete confirmation?</Popover.Header>
				<Popover.Body>
					Are you sure you want to <strong>delete</strong> this recipe?
				</Popover.Body>
				<button
					className="button is-danger"
					onClick={() => {
						userRecipeUtils.deleteRecipe(ID);
					}}
				>
					Yes
				</button>{" "}
				<button className="button">No</button>{" "}
			</Popover>
		);
	},
	deleteRecipe: async (id) => {
		try {
			// await axios.delete(`${API_URL}/userRecipe/deleteRecipe/${id}`);
			// console.log("deleted");
			fetch(`userRecipe/deleteRecipe/${id}`, {
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
			fetch(`userRecipe/createNewRecipe/1`, {
				method: "POST",
				headers: {
					name: name,
					description: description,
					instruction: instruction,
					ingredients: JSON.stringify(ingredients),
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
		console.log(name, value, recipeDetails, setRecipeDetails);
		const clonedSelectedRecipe = { ...recipeDetails };
		clonedSelectedRecipe[name] = value;
		setRecipeDetails(clonedSelectedRecipe);
	},
	addIngredient: (ingredients, setIngredients) => {
		const clonedIngredients = [...ingredients];
		const ingredientData = { ingredient_name: "", amount: "" };
		clonedIngredients.push(ingredientData);
		setIngredients(clonedIngredients);
	},
	deleteIngredient: (index, ingredients, setIngredients) => {
		const clonedIngredients = [...ingredients];
		clonedIngredients.splice(index, 1);
		setIngredients(clonedIngredients);
	},
	handleSubmit: (e, id, setCurrentView, ingredients, recipeDetails) => {
		try {
			e.preventDefault();
			fetch(`userRecipe/editRecipe/${id}`, {
				method: "PATCH",
				headers: {
					ingredients: JSON.stringify(ingredients),
					recipeDetails: JSON.stringify(recipeDetails),
				},
			}).then(() => {
				setCurrentView("allRecipes");
			});
		} catch (error) {
			console.log(error);
		}
	},
};

// exports.addNewRecipe = (
// 	e,
// 	userId,
// 	setCurrentView,
// 	{ name, description, instruction, ingredients }
// ) => {
// 	e.preventDefault();
// 	fetch(`userRecipe/createNewRecipe/${userId}`, {
// 		method: "POST",
// 		headers: {
// 			name: name,
// 			description: description,
// 			instruction: instruction,
// 			ingredients: JSON.stringify(ingredients),
// 		},
// 	}).then(() => setCurrentView("allRecipes"));
// };

// exports.deleteRecipe = (id, setCurrentView) => {
// 	fetch(`userRecipe/deleteRecipe/${id}`, {
// 		method: "DELETE",
// 	}).then(() => setCurrentView("allRecipes"));
// };

// exports.onIngredientChange = (
// 	{ name, value },
// 	index,
// 	ingredients,
// 	setIngredients
// ) => {
// 	const clonedIngredients = [...ingredients];
// 	clonedIngredients.splice(index, 1, {
// 		...ingredients[index],
// 		[name]: value,
// 	});
// 	setIngredients(clonedIngredients);
// };

// exports.onRecipeDetailChange = (
// 	{ name, value },
// 	recipeDetails,
// 	setRecipeDetails
// ) => {
// 	console.log(name, value, recipeDetails, setRecipeDetails);
// 	const clonedSelectedRecipe = { ...recipeDetails };
// 	clonedSelectedRecipe[name] = value;
// 	setRecipeDetails(clonedSelectedRecipe);
// };

// exports.addIngredient = (ingredients, setIngredients) => {
// 	const clonedIngredients = [...ingredients];
// 	const ingredientData = { ingredient_name: "", amount: "" };
// 	clonedIngredients.push(ingredientData);
// 	setIngredients(clonedIngredients);
// };

// exports.deleteIngredient = (index, ingredients, setIngredients) => {
// 	const clonedIngredients = [...ingredients];
// 	clonedIngredients.splice(index, 1);
// 	setIngredients(clonedIngredients);
// };

// exports.handleSubmit = (e, id, setCurrentView, ingredients, recipeDetails) => {
// 	e.preventDefault();
// 	fetch(`userRecipe/editRecipe/${id}`, {
// 		method: "PATCH",
// 		headers: {
// 			ingredients: JSON.stringify(ingredients),
// 			recipeDetails: JSON.stringify(recipeDetails),
// 		},
// 	}).then(() => {
// 		setCurrentView("allRecipes");
// 	});
// };

export default userRecipeUtils;
