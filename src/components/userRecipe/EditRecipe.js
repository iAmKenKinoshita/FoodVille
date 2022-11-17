import React, { useState, useEffect } from "react";
import EditIngredients from "./EditIngredients";

export default function EditRecipe(props) {
	const { setCurrentView, selectedRecipe } = props;
	const [ingredients, setIngredients] = useState([]);
	const [recipeDetails, setRecipeDetails] = useState("");

	const ID = selectedRecipe.id;

	useEffect(() => {
		fetch(`userRecipe/list/${ID}`)
			.then((result) => result.json())
			.then((data) => setIngredients(data));
		setRecipeDetails(selectedRecipe);
	}, []);

	const onInputChange = ({ name, value }, index) => {
		const clonedIngredients = [...ingredients];
		clonedIngredients.splice(index, 1, {
			...ingredients[index],
			[name]: value,
		});
		setIngredients(clonedIngredients);
	};

	const handleChange = ({ name, value }) => {
		const clonedSelectedRecipe = { ...recipeDetails };
		clonedSelectedRecipe[name] = value;
		setRecipeDetails(clonedSelectedRecipe);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`userRecipe/editRecipe/${ID}`, {
			method: "PATCH",
			headers: {
				ingredients: JSON.stringify(ingredients),
				recipeDetails: JSON.stringify(recipeDetails),
			},
		});
		setCurrentView("allRecipes");
	};

	const addIngredient = () => {
		const clonedIngredients = [...ingredients];
		const ingredientData = { ingredient_name: "", amount: "" };
		clonedIngredients.push(ingredientData);
		setIngredients(clonedIngredients);
	};

	const deleteIngredient = (index) => {
		const clonedIngredients = [...ingredients];
		clonedIngredients.splice(index, 1);
		console.log(clonedIngredients);
		setIngredients(clonedIngredients);
	};

	return (
		<>
			<p>This is from the edit component</p>
			<button type="button" onClick={() => setCurrentView("singleRecipe")}>
				Back
			</button>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter name"
					name="name"
					value={recipeDetails.name}
					onChange={(e) => {
						handleChange(e.target);
					}}
				/>
				<textarea
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter description"
					name="description"
					value={recipeDetails.description}
					onChange={(e) => {
						handleChange(e.target);
					}}
				/>
				{ingredients.map((ingredient, index) => {
					return (
						<EditIngredients
							key={index}
							ingredient={ingredient}
							onInputChange={onInputChange}
							index={index}
							deleteIngredient={deleteIngredient}
						/>
					);
				})}
				<textarea
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter instruction"
					name="instruction"
					value={recipeDetails.instruction}
					onChange={(e) => {
						handleChange(e.target);
					}}
				/>
				<button type="button" onClick={addIngredient}>
					Add More Ingredient
				</button>

				<button type="submit">Update</button>
			</form>
		</>
	);
}
