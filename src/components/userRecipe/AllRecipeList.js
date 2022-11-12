import React from "react";

export default function AllRecipeList(props) {
	const { setCurrentView, setSelectedRecipe, userRecipes } = props;

	return (
		<div>
			<button
				onClick={() => {
					setCurrentView("addNewRecipe");
				}}
			>
				Add New Recipe
			</button>
			{userRecipes.map((recipe, index) => {
				return (
					<div
						onClick={() => {
							setCurrentView("singleRecipe");
							setSelectedRecipe(userRecipes[index]);
						}}
					>
						<p>{recipe.name}</p>
						<p>{recipe.description}</p>
					</div>
				);
			})}
		</div>
	);
}
