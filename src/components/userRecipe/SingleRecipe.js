import React, { useEffect, useState } from "react";

export default function SingleRecipeList(props) {
	const { selectedRecipe, setCurrentView } = props;

	const [ingredients, setIngredients] = useState([]);

	const ID = selectedRecipe.id;

	useEffect(() => {
		fetch(`userRecipe/list/${ID}`)
			.then((result) => result.json())
			.then((data) => setIngredients(data));
	}, []);

	return (
		<div>
			<button
				onClick={() => {
					setCurrentView("allRecipes");
				}}
			>
				Back
			</button>
			<div>
				<p>{selectedRecipe.name}</p>
				<p>{selectedRecipe.description}</p>
				{ingredients.map((ingredient) => {
					return (
						<>
							<p>
								{ingredient.amount} {ingredient.ingredient_name}
							</p>
						</>
					);
				})}
				<p>{selectedRecipe.instruction}</p>
				<button
					onClick={() => {
						setCurrentView("editRecipe");
					}}
				>
					Edit
				</button>
				{/* <button
					onClick={() => {
						setCurrentView("addIngredients");
					}}
				>
					Add ingredients
				</button> */}
			</div>
		</div>
	);
}
