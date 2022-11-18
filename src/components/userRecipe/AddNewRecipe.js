import React, { useState } from "react";
import UserRecipeUtils from "./utils/userRecipe";
import EditIngredients from "./EditIngredients";

export default function AddNewRecipe(props) {
	const { setCurrentView } = props;

	const [ingredients, setIngredients] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [instruction, setInstruction] = useState("");

	const user = JSON.parse(localStorage.getItem("userData"));
	const userId = user[0].userId;

	return (
		<>
			<button type="button" onClick={() => setCurrentView("allRecipes")}>
				Back
			</button>
			<form>
				<input
					onChange={(e) => {
						setName(e.target.value);
					}}
					type="text"
					placeholder="Name"
				></input>
				<textarea
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					rows="5"
					cols="33"
					placeholder="Description"
				></textarea>
				<textarea
					onChange={(e) => {
						setInstruction(e.target.value);
					}}
					rows="5"
					cols="33"
					placeholder="Instruction"
				></textarea>
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
					Add ingredients
				</button>
				<button
					onClick={(e) => {
						UserRecipeUtils.addNewRecipe(e, userId, setCurrentView, {
							name,
							description,
							instruction,
							ingredients,
						});
					}}
				>
					Create
				</button>
			</form>
		</>
	);
}
