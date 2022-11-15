import React, { useEffect, useState } from "react";

export default function SingleRecipeList(props) {
	const { selectedRecipe, setCurrentView } = props;

	const [ingredients, setIngredients] = useState([]);

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
						console.log("This is edit button");
						setCurrentView("editRecipe");
					}}
				>
					Edit Button
				</button>
				<button
					onClick={() => {
						setCurrentView("addIngredients");
					}}
				>
					Add ingredients
				</button>
			</div>
		</div>
	);
}
