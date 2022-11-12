import React, { useState } from "react";

export default function AddIngredients(props) {
	const { selectedRecipe, setCurrentView } = props;

	const [ingredientName, setIngredientName] = useState("");
	const [amount, setAmount] = useState("");

	const addIngredients = (e) => {
		e.preventDefault();
		const ID = selectedRecipe.id;
		console.log(ID);
		fetch(`userRecipe/addIngredients/${ID}`, {
			method: "POST",
			headers: {
				ingredientName: ingredientName,
				amount: amount,
			},
		});
		setCurrentView("singleRecipe");
	};

	return (
		<>
			<form>
				<input
					onChange={(e) => {
						setIngredientName(e.target.value);
					}}
					type="text"
					placeholder="Ingredient"
				></input>
				<input
					onChange={(e) => {
						setAmount(e.target.value);
					}}
					placeholder="Amount"
				></input>
				<button onClick={addIngredients}>Create</button>
			</form>
		</>
	);
}
