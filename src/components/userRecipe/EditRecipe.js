import React, { useState, useEffect } from "react";
import User from "../user/User";
import EditIngredients from "./EditIngredients";
import UserRecipeUtils from "./utils/userRecipe";

export default function EditRecipe(props) {
	const { setCurrentView, selectedRecipe } = props;
	const [ingredients, setIngredients] = useState([]);
	const [recipeDetails, setRecipeDetails] = useState("");

	const ID = selectedRecipe.id;

	useEffect(() => {
		fetch(`userRecipe/ingredients/${ID}`)
			.then((result) => result.json())
			.then((data) => setIngredients(data));
		setRecipeDetails(selectedRecipe);
	}, []);


	return (
		<>
			<button type="button" onClick={() => setCurrentView("singleRecipe")}>
				Back
			</button>
			<form
				onSubmit={(e) => {
					UserRecipeUtils.handleSubmit(
						e,
						ID,
						setCurrentView,
						ingredients,
						recipeDetails
					);
				}}
			>
				<input
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter name"
					name="name"
					value={recipeDetails.name}
					onChange={(e) => {
						UserRecipeUtils.onRecipeDetailChange(
							e.target,
							recipeDetails,
							setRecipeDetails
						);
					}}
				/>
				<textarea
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter description"
					name="description"
					value={recipeDetails.description}
					onChange={(e) => {
						UserRecipeUtils.onRecipeDetailChange(
							e.target,
							recipeDetails,
							setRecipeDetails
						);
					}}
				/>
				<textarea
					type="text"
					className="form-control form-control-lg"
					placeholder="Enter instruction"
					name="instruction"
					value={recipeDetails.instruction}
					onChange={(e) => {
						UserRecipeUtils.onRecipeDetailChange(
							e.target,
							recipeDetails,
							setRecipeDetails
						);
					}}
				/>
				{ingredients.map((ingredient, index) => {
					return (
						<EditIngredients
							key={index}
							ingredient={ingredient}
							onIngredientChange={UserRecipeUtils.onIngredientChange}
							index={index}
							deleteIngredient={UserRecipeUtils.deleteIngredient}
							setIngredients={setIngredients}
							ingredients={ingredients}
						/>
					);
				})}

				<button
					type="button"
					onClick={() => {
						UserRecipeUtils.addIngredient(ingredients, setIngredients);
					}}
				>
					Add More Ingredient
				</button>

				<button type="submit">Update</button>
			</form>
		</>
	);
}
